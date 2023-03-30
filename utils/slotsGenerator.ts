import * as m from 'moment';
import MeetingsDay from 'vue-meeting-selector/src/interfaces/MeetingsDay.interface';
// import MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';
// import Time from 'vue-meeting-selector/src/interfaces/Time.interface';
import { DateRange, extendMoment, MomentRange } from 'moment-range';
import { TimeRangeFormat } from '@/types/api/schedule';
import {
  GenerateCalendarSlotsParam,
  ParsedTimeRanges,
} from '@/types/utils/calendar-slots-generator';

const moment = extendMoment(m);

// function formattingDate(date: Date | string): string {
//   const d = new Date(date);
//   const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
//   const month =
//     d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
//   const year = d.getFullYear();
//   return `${year}-${month}-${day}`;
// }

// function randomNumber(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min) + min);
// }

// function setTime(date: Date, time: Time): Date {
//   const d: Date = new Date(date);
//   d.setHours(time.hours);
//   d.setMinutes(time.minutes);
//   d.setSeconds(0);
//   d.setMilliseconds(0);
//   return d;
// }

// function roundToClosestTime(date: Date, interval: number): Date {
//   const d: Date = new Date(date);
//   const minutes: number = d.getMinutes();
//   const minutesToAdd: number = minutes % interval;
//   d.setMinutes(minutes + (interval - minutesToAdd));
//   d.setSeconds(0);
//   d.setMilliseconds(0);
//   return d;
// }

// function roundDate(date: Date): Date {
//   const tz = -date.getTimezoneOffset();
//   const time: Time = {
//     hours: Math.floor(tz / 60),
//     minutes: tz % 60,
//   };
//   return setTime(date, time);
// }

// function generateSlots(
//   start: Date,
//   end: Date,
//   interval: number,
//   randomSlotsToDelete = 0
// ): MeetingSlot[] {
//   let startStamp: number = start.getTime();
//   const endStamp: number = end.getTime();
//   const slots: MeetingSlot[] = [];
//   for (; startStamp <= endStamp; startStamp += interval * 60000) {
//     const slot: MeetingSlot = {
//       date: new Date(startStamp),
//     };
//     slots.push(slot);
//   }
//   for (let i = 0; i < randomSlotsToDelete; i += 1) {
//     const indexToDelete = randomNumber(0, slots.length);
//     slots.splice(indexToDelete, 1);
//   }
//   return slots;
// }

// function generateFirstDate(
//   date: Date,
//   interval: number,
//   startTime: Time,
//   endTime: Time
// ): MeetingsDay {
//   let start: Date;
//   if (formattingDate(date) <= formattingDate(new Date())) {
//     start = roundToClosestTime(date, interval);
//   } else {
//     start = setTime(date, startTime);
//   }
//   const end: Date = setTime(date, endTime);
//   const slots: MeetingSlot[] = generateSlots(start, end, interval);
//   return {
//     date: roundDate(date),
//     slots,
//   };
// }

// type GenerateDaysParam = {
//   date: Date;
//   nbDays: number;
//   startTime: Time;
//   endTime: Time;
//   interval: number;
// };

// function generateDays({
//   date,
//   nbDays,
//   startTime,
//   endTime,
//   interval,
// }: GenerateDaysParam): MeetingsDay[] {
//   const days: MeetingsDay[] = [];
//   days.push(generateFirstDate(date, interval, startTime, endTime));
//   // Set to second Day
//   const startingDay: Date = new Date(date);
//   for (let i = 1; i < nbDays; i += 1) {
//     const slotsDate: Date = new Date(
//       startingDay.setDate(startingDay.getDate() + 1)
//     );
//     if (slotsDate.getDay() === 0 || slotsDate.getDay() === 6) {
//       i -= 1;
//     } else {
//       const startDate: Date = setTime(slotsDate, startTime);
//       const endDate: Date = setTime(slotsDate, endTime);
//       const slots: MeetingSlot[] = generateSlots(
//         startDate,
//         endDate,
//         interval,
//         randomSlotsToDelete
//       );
//       const meetingsDay: MeetingsDay = {
//         date: roundDate(startingDay),
//         slots,
//       };
//       days.push(meetingsDay);
//     }
//   }
//   return days;
// }

const parseTimeRange = (timeRange: string): ParsedTimeRanges => {
  const [range1, range2] = timeRange.split('-');
  return [range1, range2].map((range) => {
    const [hours, minutes] = range.split(':');
    return [Number(hours), Number(minutes)];
  }) as ParsedTimeRanges;
};

const makeRange = (date: m.Moment, timeRage: TimeRangeFormat): DateRange => {
  const [[fromHours, fromMinutes], [toHours, toMinutes]] =
    parseTimeRange(timeRage);
  const fromTime = moment(date).set({
    hours: fromHours,
    minutes: fromMinutes,
  });
  const toTime = moment(date).set({
    hours: toHours,
    minutes: toMinutes,
  });
  return moment.range(fromTime, toTime);
};

const INTERVAL_MINUTES = 30;

/**
 * Generate available times in a specific range.
 * @param {GenerateCalendarSlotsParam} generateCalendarSlotsParam
 * @returns {MeetingsDay[]}
 */
const generateCalendarSlots = ({
  fromDate,
  toDate,
  unavailableTimeRanges,
}: GenerateCalendarSlotsParam): MeetingsDay[] => {
  let date = fromDate;

  while (date.isSameOrBefore(toDate)) {
    const unavailableRanges = [
      ...selectedTimeRanges,
      ...unavailableTimeRanges,
    ].map((range) => makeRange(date, range));

    date = date.add(1, 'day');
  }
};

export default generateCalendarSlots;
