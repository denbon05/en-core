import { Moment } from 'moment';
import type CalendarOptions from 'vue-meeting-selector/src/interfaces/CalendarOptions.interface';
import type MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';
import type MeetingsDay from 'vue-meeting-selector/src/interfaces/MeetingsDay.interface';
import { ScheduledTime } from '../api/schedule';

export type ScheduledTimes = ScheduledTime[];

export interface ILessonCalendar {
  fromDate: Moment;
  nbDaysToDisplay: number;
  showUntilDate: Moment;
  lessons: MeetingSlot[];
  scheduledTimes: ScheduledTimes;
  isLoading: boolean;
  calendarOptions: CalendarOptions;

  isVisible: boolean;
  monthAndYear: string;
  availableDays: MeetingsDay[];

  nextDate: () => Promise<void>;
  prevDate: () => Promise<void>;
  prevMonth: () => void;
  nextMonth: () => void;
  getMeetings: () => string[];
  bookLesson: (args: any) => Promise<void>;
}
