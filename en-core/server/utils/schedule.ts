import moment from 'moment';
import { UserUnavailableType } from '@prisma/client';
import { DateRange } from 'moment-range';
import {
  ISOScheduledTime,
  SpreadTimeParam,
  ScheduledTimeWithType,
} from '@/types/api/schedule';

export const spreadTime = ({
  range,
  since,
  until,
  interval,
}: SpreadTimeParam): ISOScheduledTime[] => {
  const { hours: sinceHours, minutes: sinceMinutes } =
    since instanceof Date
      ? {
          hours: moment(since).get('hours'),
          minutes: moment(since).get('minutes'),
        }
      : since;
  const { hours: untilHours, minutes: untilMinutes } =
    until instanceof Date
      ? {
          hours: moment(until).get('hours'),
          minutes: moment(until).get('minutes'),
        }
      : until;

  return Array.from(range.by(interval, { step: 1 })).map((unit) => ({
    since: unit
      .set({
        hours: sinceHours,
        minutes: sinceMinutes,
      })
      .toISOString(),
    until: unit
      .set({
        hours: untilHours,
        minutes: untilMinutes,
      })
      .toISOString(),
  }));
};

export const generateUnavailableTimes = (
  scheduledTime: ScheduledTimeWithType[],
  range: DateRange
): ISOScheduledTime[] => {
  const isTotalRangeBiggerThanWeek = range.duration('days') > 7;

  return scheduledTime.flatMap(
    ({ since, until, type }): ISOScheduledTime | ISOScheduledTime[] => {
      if (!type || type === UserUnavailableType.ONCE || type === 'TRIAL') {
        // google or single event
        return { since: since.toISOString(), until: until.toISOString() };
      }
      // in case there are regular scheduled times - spread it
      // ? spread time on the client in order to reduce network load

      const sinceTime = {
        hours: moment(since).get('hours'),
        minutes: moment(since).get('minutes'),
      };
      const untilTime = {
        hours: moment(until).get('hours'),
        minutes: moment(until).get('minutes'),
      };

      if (type === UserUnavailableType.WEEKLY && isTotalRangeBiggerThanWeek) {
        // each week the same unavailable time
        return spreadTime({
          range,
          since: sinceTime,
          until: untilTime,
          interval: 'week',
        });
      }

      // daily regular unavailable time
      return spreadTime({
        range,
        since: sinceTime,
        until: untilTime,
        interval: 'day',
      });
    }
  );
};
