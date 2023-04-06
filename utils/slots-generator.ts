import * as m from 'moment';
import { DateRange, extendMoment } from 'moment-range';
import MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';
import MeetingsDay from 'vue-meeting-selector/src/interfaces/MeetingsDay.interface';
import {
  AggregatedRangesByDate,
  GenerateAvailableTimesParam,
  GenerateCalendarSlotsParam,
} from '@/types/utils/calendar-slots-generator';

const moment = extendMoment(m);

export const stepInMinutes = 30;

/**
 * Generate available times. `avoidedRanges` should be in ISO format.
 * @param {GenerateAvailableTimesParam}
 * @returns {MeetingSlot[]}
 */
export const generateAvailableTimes = ({
  avoidedRanges,
  date,
}: GenerateAvailableTimesParam): MeetingSlot[] => {
  const wholeDayRange = moment.range(date, date).snapTo('day');
  const availableTimes: MeetingSlot[] = [];

  for (const fromTime of wholeDayRange.by('minutes', {
    step: stepInMinutes,
    excludeEnd: true,
  })) {
    const toTime = fromTime.add(stepInMinutes, 'minutes');
    const timeRange = moment.range(fromTime, toTime);
    const isTimeOverlaps = avoidedRanges.some((range) =>
      range.overlaps(timeRange)
    );

    // TODO remove `isSame`, don't iterate further than one date
    if (!isTimeOverlaps && fromTime.isSame(date, 'date')) {
      availableTimes.push({
        date: fromTime.toLocaleString(),
      });
    }
  }

  return availableTimes;
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
    moment.range(since, until)
  );
  // aggregate ranges by date
  const unavailableRangesByDate = aggregateRangesByDate(ranges);
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
