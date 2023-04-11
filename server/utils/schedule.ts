import { ISOScheduledTime, SpreadTimeParam } from '@/types/api/schedule';

export const spreadTime = ({
  range,
  since: { hours: sinceHours, minutes: sinceMinutes },
  until: { hours: untilHours, minutes: untilMinutes },
  interval,
}: SpreadTimeParam): ISOScheduledTime[] =>
  Array.from(range.by(interval, { step: 1 })).map((unit) => ({
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
