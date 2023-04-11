import { getTimeMin, getUnavailableTimes } from '@/__tests__/helpers/schedule';
import { fetch as fetchSchedule } from '@/api/user/schedule';
import { FetchParam } from '@/types/api/schedule';
import type { UnavailableTimes } from '@/__tests__/types/schedule';
import { predefinedUserId } from '@/prisma/seed';
import { spreadTime } from '@/server/utils/schedule';
import { Moment } from 'moment';
import { DateRange } from 'moment-range';
// TODO change to import after https://github.com/rotaready/moment-range/issues/295
const m = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(m);

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
  });
});

// describe('Manipulate schedule - week interval', () => {
//   let predefinedUnavailableTimes: UnavailableTimes;
//   let fetchParam: FetchParam;

//   beforeAll(async () => {
//     const timeMin = await getTimeMin(predefinedUserId);
//     fetchParam = {
//       timeMin,
//       timeMax: moment(timeMin).add(1, 'week').toISOString(),
//       userId: predefinedUserId,
//     };
//     predefinedUnavailableTimes = await getUnavailableTimes(predefinedUserId);
//   });

//   test('Fetch tutor schedule - unauthorized user', async () => {
//     const { scheduledTimes } = await fetchSchedule(fetchParam, null);
//     const scheduledTimesExpected = Array(7);
//   });
// });
