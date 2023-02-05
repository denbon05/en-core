import type MeetingsDay from 'vue-meeting-selector/src/interfaces/MeetingsDay.interface';
import type CalendarOptions from 'vue-meeting-selector/src/interfaces/CalendarOptions.interface';
import type MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';
import type Time from 'vue-meeting-selector/src/interfaces/Time.interface';

export interface ILessonCalendar {
  lessonDays: MeetingsDay[];
  nbDaysToDisplay: number;
  isVisible: boolean;
  calendarOptions: CalendarOptions;
  date: Date;
  lessons: MeetingSlot[];
  lessonFromTime: Time;
  lessonToTime: Time;
  loading: boolean;
  month: string;
  year: any;
  nextDate: () => Promise<void>;
  prevDate: () => Promise<void>;
  prevMonth: () => void;
  nextMonth: () => void;
  updateCalendarByMonth: (monthIdx: number) => Promise<void>;
  getMeetings: () => string[];
}
