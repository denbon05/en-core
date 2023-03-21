import { calendar_v3 } from 'googleapis';

export type SyncParam = {
  calendarIds: string[];
};

export type CalendarEventsParam = Pick<
  calendar_v3.Params$Resource$Events$List,
  'timeMin' | 'timeMax'
>;
