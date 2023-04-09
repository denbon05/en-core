import { ScheduledTime, SpreadTimeParam } from '@/types/api/schedule';

export const spreadTime = ({
  range,
  since: { hours: sinceHours, minutes: sinceMinutes },
  until: { hours: untilHours, minutes: untilMinutes },
  interval,
}: SpreadTimeParam): ScheduledTime[] =>
  Array.from(range.by(interval, { step: 1 })).map((unit) => ({
    since: new Date(
      unit
        .set({
          hours: sinceHours,
          minutes: sinceMinutes,
        })
        .toISOString()
    ),
    until: new Date(
      unit
        .set({
          hours: untilHours,
          minutes: untilMinutes,
        })
        .toISOString()
    ),
  }));
