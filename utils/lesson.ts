import MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';
import moment from 'moment';
import { LessonType } from '@prisma/client';
import { LessonData } from '@/types/api/lesson';

// TODO apply personal user config
const defaultConfig = {
  trialDurationInMinutes: 30,
  normalDurationInMinutes: 50,
};

export default class Lessons {
  private readonly type: LessonType;

  private config: typeof defaultConfig;

  constructor(type: LessonType, config = defaultConfig) {
    this.type = type;
    this.config = config;
  }

  public toTimeScheduled = (slots: MeetingSlot[]): LessonData[] =>
    slots.map(({ date }): LessonData => {
      const since = new Date(date);
      if (this.type === 'TRIAL') {
        return {
          since,
          until: new Date(
            moment(date)
              .add(this.config.trialDurationInMinutes, 'minutes')
              .toISOString()
          ),
        };
      }
      return {
        since,
        until: new Date(
          moment(date)
            .add(this.config.normalDurationInMinutes, 'minutes')
            .toISOString()
        ),
      };
    });
}
