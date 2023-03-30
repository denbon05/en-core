import { Moment } from 'moment';
import { CalendarEvent } from '../api/google';

export type GenerateCalendarSlotsParam = {
  fromDate: Moment;
  toDate: Moment;
  unavailableTimeRanges: CalendarEvent[];
};
