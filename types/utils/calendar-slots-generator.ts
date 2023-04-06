import { Moment } from 'moment';
import { DateRange } from 'moment-range';
import { ScheduledTime } from '../api/schedule';

export type GenerateAvailableTimesParam = {
  avoidedRanges: DateRange[];
  date: Moment;
};

export type AggregatedRangesByDate = {
  [key: string]: DateRange[];
};

export type GenerateCalendarSlotsParam = {
  fromDate: Moment;
  toDate: Moment;
  unavailableTimeRanges: ScheduledTime[];
};
