import { Moment } from 'moment';
import { DateRange, MomentRange } from 'moment-range';
import schedules from '@/__fixtures__/user-schedule';
import userUnavailable from '@/__fixtures__/user-unavailable';
import users from '@/__fixtures__/users';
import { seedDB } from '@/__tests__/helpers/server';
import { fetch as fetchSchedule } from '@/server/api/v1/user/schedule';
import { generateUnavailableTimes, spreadTime } from '@/server/utils/schedule';
// TODO change to import after https://github.com/rotaready/moment-range/issues/295
const m = require('moment');
const momentRange = require('moment-range');

const moment: MomentRange = momentRange.extendMoment(m);

describe('Schedule utils', () => {
  describe('Spread time', () => {
    const sinceDate: Moment = moment('2023-04-11T18:44:40');
    const untilDate: Moment = moment('2023-04-19T18:44:40');
    const range: DateRange = moment.range(sinceDate, untilDate).snapTo('days');
    const sinceForSpread = {
      hours: 3,
      minutes: 0,
    };
    const untilForSpread = {
      hours: 5,
      minutes: 30,
    };

    test('Day interval', () => {
      const widespreadTimes = spreadTime({
        range,
        interval: 'day',
        since: sinceForSpread,
        until: untilForSpread,
      });

      expect(widespreadTimes).toHaveLength(Array.from(range.by('days')).length);
      expect(
        widespreadTimes.every(({ since, until }) => {
          const sinceM = moment(since);
          const untilM = moment(until);

          return (
            sinceM.get('hours') === sinceForSpread.hours &&
            sinceM.get('minutes') === sinceForSpread.minutes &&
            untilM.get('hours') === untilForSpread.hours &&
            untilM.get('minutes') === untilForSpread.minutes
          );
        })
      ).toBeTruthy();
    });

    test('Week interval', () => {
      const widespreadTimes = spreadTime({
        range,
        interval: 'week',
        since: sinceForSpread,
        until: untilForSpread,
      });

      expect(widespreadTimes).toHaveLength(2);
      expect(
        widespreadTimes.every(({ since, until }) => {
          const sinceM = moment(since);
          const untilM = moment(until);

          return (
            sinceM.get('hours') === sinceForSpread.hours &&
            sinceM.get('minutes') === sinceForSpread.minutes &&
            untilM.get('hours') === untilForSpread.hours &&
            untilM.get('minutes') === untilForSpread.minutes
          );
        })
      ).toBeTruthy();
    });
  });

  describe('Generate unavailable times', () => {
    test('Daily for 3 days', () => {
      const since = new Date('2023-04-10T00:00:00.000Z');
      const until = new Date('2023-04-10T08:00:00.000Z');
      const range = moment
        .range(moment('2023-04-11T18:44:40'), moment('2023-04-13T18:44:40'))
        .snapTo('days');
      const unavailableTimes = generateUnavailableTimes(
        [{ since, until, type: 'DAILY' }],
        range
      );

      expect(unavailableTimes).toHaveLength(3);

      const sinceM = moment(since);
      const untilM = moment(until);
      expect(
        unavailableTimes.every(({ since, until }) => {
          const sinceHour = moment(since).get('hour');
          const sinceMinute = moment(since).get('minutes');
          const untilHour = moment(until).get('hour');
          const untilMinute = moment(until).get('minutes');

          return (
            sinceHour === sinceM.get('hour') &&
            sinceMinute === sinceM.get('minutes') &&
            untilHour === untilM.get('hour') &&
            untilMinute === untilM.get('minutes')
          );
        })
      );
    });
  });
});

describe('Manipulate schedule', () => {
  const [tutorSam] = users;
  const tutorSamSchedule = schedules.find(
    ({ userId }) => tutorSam.id === userId
  );
  const tutorSamUnavailable = userUnavailable.filter(
    ({ scheduleId }) => tutorSamSchedule?.id === scheduleId
  );

  beforeAll(async () => {
    await seedDB();
  });

  // beforeEach(async () => {
  //   await prisma.$queryRawUnsafe('BEGIN');
  // });

  // afterEach(async () => {
  //   await prisma.$queryRawUnsafe('ROLLBACK');
  // });

  test("Fetch by unauthorized user tutor's schedule for 3 days", async () => {
    // from timestamp to timestamp
    const timeMinMoment = moment('2023-04-11T18:44:40');
    const timeMaxMoment = moment('2023-04-13T18:44:40');
    const { scheduledTimes, isSuccess } = await fetchSchedule(
      {
        timeMin: timeMinMoment.toISOString(),
        timeMax: timeMaxMoment.toISOString(),
        userId: tutorSam.id,
      },
      null
    );
    expect(isSuccess).toBeTruthy();
    // 2023-04-06 00:00:00.000 +0200 became 2023-04-05T22:00:00.000Z
    // client format timestamp to local time
    expect(scheduledTimes).toHaveLength(6); // morning and evening ranges

    const range = moment.range(timeMinMoment, timeMaxMoment).snapTo('days');
    const scheduledTimesExpected = generateUnavailableTimes(
      tutorSamUnavailable,
      range
    );
    expect(scheduledTimes).toStrictEqual(scheduledTimesExpected);
  });
});
