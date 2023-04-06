// import { UserUnavailableType } from '@prisma/client';
import { Moment } from 'moment';
import { DateRange } from 'moment-range';
// import MeetingsDay from 'vue-meeting-selector/src/interfaces/MeetingsDay.interface';
import MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';
// import { ScheduledTime } from '@/types/api/schedule';
import { generateAvailableTimes, stepInMinutes } from '@/utils/slots-generator';

const m = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(m);

const simulateGenerator = (
  availableSince: Moment,
  availableUntil: Moment
): MeetingSlot[] =>
  Array.from(
    moment
      .range(availableSince, availableUntil)
      .by('minutes', { step: stepInMinutes })
    // TODO remove any after done https://github.com/rotaready/moment-range/issues/295
  ).map((time: any) => ({ date: time.toLocaleString() }));

describe('Check generators', () => {
  const availableSince1 = moment('2023-04-06T08:00:00+02:00');
  const availableUntil1 = moment('2023-04-06T13:30:00+02:00');
  const availableSince2 = moment('2023-04-06T17:00:00+02:00');
  const availableUntil2 = moment('2023-04-06T21:00:00+02:00');

  const avoidedRanges: DateRange[] = [
    moment.range(moment('2023-04-06T00:00:00+02:00'), availableSince1),
    moment.range(availableUntil1, availableSince2),
    moment.range(availableUntil2, moment('2023-04-06T23:59:00+02:00')),
  ];

  test('Generate available times', () => {
    const actual = generateAvailableTimes({
      avoidedRanges,
      date: availableSince1, // only date is important
    });

    const expected: MeetingSlot[] = [
      ...simulateGenerator(availableSince1, availableUntil1),
      ...simulateGenerator(availableSince2, availableUntil2),
    ];

    expect(actual).toEqual(expected);
  });
});

// const generatedDaysAmount = 3;
// const availableSinceHour = 8;
// const fromDate = moment();
// const toDate = moment().add(generatedDaysAmount, 'days');

// const generateExpected = (
//   scheduledTimes: ScheduledTime[],
//   type: UserUnavailableType
// ): MeetingsDay[] => {
//   switch (type) {
//     case 'ONCE':
//       return Array.from({ length: generatedDaysAmount }).reduce<MeetingsDay[]>(
//         (acc) => {
//           // const availableDateTimes =
//           return acc;
//         },
//         []
//       );
//     // TODO
//     //   case 'DAILY':
//     //   // unavailable each day at the same time
//     //   case 'WEEKLY':
//     // // unavailable once per week at the same time
//     default:
//       throw new Error(`There is no such type "${type}"`);
//   }
// };

// describe('Generate slots', () => {
//   const unavailableTypes: UserUnavailableType[] = [
//     'ONCE',
//     // 'DAILY',
//     // 'WEEKLY',
//   ];

//   describe.each(unavailableTypes)('Generate with type %p', (type) => {
//     // set unavailable for one day only in order to test `unavailableTypes`
//     const unavailableTimeRanges: ScheduledTime[] = [
//       {
//         since: new Date(fromDate.set({ hour: 0, minutes: 0 }).toISOString()),
//         until: new Date(
//           fromDate.set({ hours: availableSinceHour, minutes: 0 }).toISOString()
//         ),
//         type,
//       },
//     ];

//     const availableDateTimes = generateCalendarSlots({
//       fromDate,
//       toDate,
//       unavailableTimeRanges,
//     });
//     expect(true).toBeTruthy();
//   });
// });
