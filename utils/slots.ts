import { DateRange, MomentRange } from 'moment-range';
import MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';
import MeetingsDay from 'vue-meeting-selector/src/interfaces/MeetingsDay.interface';
import {
  AggregatedRangesByDate,
  GenerateAvailableTimesParam,
  GenerateCalendarSlotsParam,
} from '@/types/utils/calendar-slots-generator';

// TODO change to import after https://github.com/rotaready/moment-range/issues/295
const m = require('moment');
const momentRange = require('moment-range');

const moment: MomentRange = momentRange.extendMoment(m);

export const stepInMinutes = 30;

/**
 * Generate available times. `avoidedRanges` should be in ISO format.
 * @param {GenerateAvailableTimesParam}
 * @returns {MeetingSlot[]}
 */
export const generateAvailableTimes = ({
  avoidedRanges = [],
  date,
}: GenerateAvailableTimesParam): MeetingSlot[] => {
  const wholeDayRange = moment.range(date, date).snapTo('day');
  const availableTimes: MeetingSlot[] = [];

  for (const fromTime of wholeDayRange.by('minutes', {
    step: stepInMinutes,
    excludeEnd: true,
  })) {
    const toTime = fromTime.clone().add(stepInMinutes, 'minutes');
    const timeRange = moment.range(fromTime, toTime);
    const isTimeOverlaps = avoidedRanges.some((range) =>
      range.overlaps(timeRange)
    );

    if (!isTimeOverlaps) {
      availableTimes.push({
        date: fromTime.toLocaleString(),
      });
    }
  }

  return availableTimes;
};

const includePassedTimes = (ranges: DateRange[] = []): DateRange[] => {
  // Get the start of the current day
  const startOfDay = moment().startOf('day');
  // Create a range from the start of the day until the current moment
  const passedTimeRange = moment.range(startOfDay, moment());

  return ranges.reduce<DateRange[]>((acc, range) => {
    if (passedTimeRange.overlaps(range)) {
      const mergedRange: DateRange = passedTimeRange.add(range, {
        adjacent: true,
      }) as Cast<DateRange>;
      return [...acc, mergedRange];
    }
    return [...acc, range];
  }, []);
};

export const aggregateRangesByDate = (
  ranges: DateRange[]
): AggregatedRangesByDate =>
  ranges.reduce<AggregatedRangesByDate>((acc, range) => {
    const date = range.start.get('date');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(range);
    return acc;
  }, {});

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
  const totalRange = moment.range(fromDate, toDate);
  // convert to moment ranges
  const ranges = unavailableTimeRanges.map(({ since, until }) =>
    moment.range(moment(since), moment(until))
  );
  // aggregate ranges by date
  const unavailableRangesByDate = aggregateRangesByDate(ranges);
  if (totalRange.contains(moment())) {
    // so there is today's day in the range
    const todayDate = moment().get('date');
    // make passed time unavailable
    unavailableRangesByDate[todayDate] = includePassedTimes(
      unavailableRangesByDate[todayDate]
    );
  }
  const availableDateTimes: MeetingsDay[] = [];

  for (const date of totalRange.by('days')) {
    const formattedDate = date.get('date');
    const unavailableRangesCurrentDay = unavailableRangesByDate[formattedDate];
    const availableTimes = generateAvailableTimes({
      avoidedRanges: unavailableRangesCurrentDay,
      date,
    });
    availableDateTimes.push({
      date: date.toLocaleString(),
      slots: availableTimes,
    });
  }

  return availableDateTimes;
};

export default generateCalendarSlots;
