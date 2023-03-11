/* eslint-disable no-console */
import { google } from 'googleapis';
import debug from 'debug';
import type { GoogleTokenData } from '../../types/api/auth';
import { GOOGLE_API_KEY } from '../../server/config';
import { oauth } from '../helpers/google';

const log = debug('api:calendar');

export async function events(...params: any) {
  console.log('calendar: ', params);

  const calendar = google.calendar('v3');
  const authData: GoogleTokenData = JSON.parse(await oauth.getTokenData());

  const res = await calendar.events.list({
    calendarId: '', // TODO retrieve
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    key: GOOGLE_API_KEY,
    oauth_token: authData.access_token,
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });

  console.log('SUCCESS!!!!!!!!!!!!', { res });
  console.log({ events });

  // * ---------------------

  // const auth = await authorize();
  // console.log({ auth });
  // const res = listEvents(auth);
  // await main();

  return JSON.stringify(res);
}

export async function list(_params: never) {
  const calendar = google.calendar('v3');
  const authData: GoogleTokenData = JSON.parse(await oauth.getTokenData());

  try {
    const {
      data: { items },
    } = await calendar.calendarList.list({
      key: GOOGLE_API_KEY,
      oauth_token: authData.access_token,
    });

    return {
      isSuccess: true,
      items,
    };
  } catch (err) {
    log('calendarList error %p', err);
    return {
      isSuccess: false,
    };
  }
}
