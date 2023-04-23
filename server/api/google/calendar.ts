/* eslint-disable no-console */
import debug from 'debug';
import { google } from 'googleapis';
import { GOOGLE_API_KEY } from '../../config';
import { decryptData } from '../../modules/crypto';
import prisma from '../../modules/prisma';
import { EncryptedData } from '@/types/utils/crypto';
import { UserDataOrNull } from '@/types/api/user';
import {
  CalendarEvent,
  CalendarEventsParam,
  SyncParam,
} from '@/types/api/google';

const log = debug('app:api:google:calendar');

// * The google API forbidden for non-auth users by middleware

const getOAuthDecrypted = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      google: {
        select: {
          oauth: true,
        },
      },
    },
  });

  if (!user || !user.google?.oauth) {
    throw new Error('Authorize to google account first.');
  }

  const { google: googleTableData } = user;

  const { oauth: oauthEncrypted } = googleTableData as Cast<{
    oauth: EncryptedData;
  }>;
  return decryptData(oauthEncrypted);
};

export async function events(
  { timeMin, timeMax }: CalendarEventsParam,
  { id }: Exclude<UserDataOrNull, null>
) {
  const calendar = google.calendar('v3');

  const authData = await getOAuthDecrypted(id);
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      google: {
        select: {
          calendarIds: true,
        },
      },
    },
  });

  if (!user?.google?.calendarIds) {
    return {
      isSuccess: false,
      message: 'Sync google first',
    };
  }

  const calendarEventsPromises = user.google.calendarIds.map((calendarId) =>
    calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      // maxResults: 10,
      // singleEvents: true,
      // orderBy: 'startTime',
      key: GOOGLE_API_KEY,
      oauth_token: authData.access_token,
    })
  );

  const responses = await Promise.all(calendarEventsPromises);
  const events: CalendarEvent[] = responses.flatMap(
    ({ data: { items = [] } }) =>
      items
        .filter(({ start, end }) => start && end)
        .map(({ start, end, summary }) => ({
          start: start!.dateTime ?? start!.date,
          end: end!.dateTime ?? end!.date,
          summary,
        }))
  ) as Cast<CalendarEvent[]>;

  return {
    isSuccess: true,
    events,
  };
}

export async function list(
  _params: never,
  { id }: Exclude<UserDataOrNull, null>
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        google: {
          select: {
            oauth: true,
          },
        },
      },
    });
    // todo

    const calendar = google.calendar('v3');

    const oauthDecrypted = await getOAuthDecrypted(id);
    console.log('LIST: ', { oauthDecrypted });

    const {
      data: { items },
    } = await calendar.calendarList.list({
      key: GOOGLE_API_KEY,
      oauth_token: oauthDecrypted.access_token,
    });

    if (!items) {
      return {
        isSuccess: false,
        message: "Could'n get calendar list",
      };
    }
    const list = items.map(({ summary, id }) => ({ summary, id }));

    return {
      isSuccess: true,
      list,
    };
  } catch (err) {
    log('calendarList error %p', err);
    return {
      isSuccess: false,
      message: err.message,
    };
  }
}

export async function sync(
  { calendarIds }: SyncParam,
  { id }: Exclude<UserDataOrNull, null>
) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        google: {
          update: {
            calendarIds,
          },
        },
      },
    });

    return {
      isSuccess: true,
    };
  } catch (err) {
    log('sync calendar err %O', err);
    return {
      isSuccess: false,
      message: "Can't sync",
    };
  }
}
