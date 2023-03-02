/* eslint-disable no-console */
import { google } from 'googleapis';
import type { GoogleTokenData } from '../../types/api/auth';
import { GOOGLE_API_KEY } from '../config/';
import { oauth } from '../helpers/google';

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

export async function list() {
  // todo
}
