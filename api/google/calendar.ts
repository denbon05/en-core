/* eslint-disable no-console */
import debug from 'debug';
import { google } from 'googleapis';
import { GOOGLE_API_KEY } from '../../server/config';
import type { GoogleTokenData } from '../../types/api/auth';
import { User } from '../../server/models';
import { UserData } from '@/types/api/user';

const log = debug('app:api:calendar');

export async function data(_args: never, { id }: UserData) {
  try {
    const [row] = await User.query().modify('withGoogle', id);
    console.log('!!!!!!!!!!!!synced', { row });
    // const { oauth } = row as Cast<{ oauth: GoogleTokenData }>;
    return {
      isSuccess: true,
      isSynced: false,
    };
  } catch (err) {
    log('fetch data err %O', err);
    return {
      isSuccess: false,
      message: err.message,
    };
  }
}

export async function events(_args: never, { id }: UserData) {
  const calendar = google.calendar('v3');
  const authData = await User.query().modify('withGoogle', id);

  console.log('events', { authData });

  // const res = await calendar.events.list({
  //   calendarId: '', // TODO retrieve
  //   timeMin: new Date().toISOString(),
  //   maxResults: 10,
  //   singleEvents: true,
  //   orderBy: 'startTime',
  //   key: GOOGLE_API_KEY,
  //   oauth_token: authData.access_token,
  // });
  // const events = res.data.items;
  // if (!events || events.length === 0) {
  //   console.log('No upcoming events found.');
  //   return;
  // }
  // console.log('Upcoming 10 events:');
  // events.map((event, i) => {
  //   const start = event.start.dateTime || event.start.date;
  //   console.log(`${start} - ${event.summary}`);
  // });

  // console.log('SUCCESS!!!!!!!!!!!!', { res });
  // console.log({ events });

  // * ---------------------

  // const auth = await authorize();
  // console.log({ auth });
  // const res = listEvents(auth);
  // await main();

  return JSON.stringify('res');
}

export async function list(_params: never, { id }: UserData) {
  const calendar = google.calendar('v3');
  const oauthData = await User.query().modify('withGoogle', id);
  console.log('LIST: ', { oauthData });

  // try {
  //   const {
  //     data: { items },
  //   } = await calendar.calendarList.list({
  //     key: GOOGLE_API_KEY,
  //     oauth_token: oauthData.access_token,
  //   });

  //   return {
  //     isSuccess: true,
  //     items,
  //   };
  // } catch (err) {
  //   log('calendarList error %p', err);
  //   return {
  //     isSuccess: false,
  //   };
  // }
  return {
    isSuccess: false,
  };
}
