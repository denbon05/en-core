/* eslint-disable camelcase */
import { calendar_v3 } from 'googleapis';

export type SyncParam = {
  calendarIds: string[];
};

export type CalendarEventsParam = Required<
  Pick<calendar_v3.Params$Resource$Events$List, 'timeMin' | 'timeMax'>
>;

export type CalendarEvent = {
  start: string;
  end: string;
  summary?: string;
};
