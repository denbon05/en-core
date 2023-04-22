<template>
  <section id="calendarMonth">
    <section class="d-flex justify-center align-center">
      <v-btn
        :disabled="isPreviousMonthBtnDisabled"
        icon
        large
        @click="prevMonth"
      >
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        <v-icon color="#39adee">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text-center">{{ `${monthAndYear}` }}</span>
      <v-btn icon large @click="nextMonth">
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        <v-icon color="#39adee">mdi-chevron-right</v-icon>
      </v-btn>
    </section>

    <v-divider class="mt-3"></v-divider>
    <meeting-selector
      v-model="lessons"
      :date="meetingSelectorDate"
      :meetings-days="availableDays"
      :calendar-options="calendarOptions"
      :multi="canUserSelectFewLessons"
      :loading="isLoading"
      @next-date="nextDate"
      @previous-date="prevDate"
    >
    </meeting-selector>
  </section>
</template>

<script lang="ts">
import {
  ILessonCalendar,
  ScheduledTimes,
} from '@/types/components/lesson-calendar';
import generateCalendarSlots from '@/utils/slots';
import { differenceBy } from 'lodash';
import moment, { Moment } from 'moment';
import Vue, { VueConstructor } from 'vue';
import type MeetingsDay from 'vue-meeting-selector/src/interfaces/MeetingsDay.interface';
import MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';

// todo make calendar scrollable
// TODO move all schedule logic to the class TutorSchedule
export default (Vue as VueConstructor<Vue & ILessonCalendar>).extend({
  name: 'LessonsCalendar',

  inject: ['showSnackbar'],

  props: {
    value: {
      required: true,
      type: Number,
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    canUserSelectFewLessons: {
      type: Boolean,
      required: true,
    },
    additionalTime: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      fromDate: moment(), // now by default
      nbDaysToAdd: 6,
      lessons: [] as MeetingSlot[],
      scheduledTimes: [] as ScheduledTimes,
      autoRefreshId: null as NodeJS.Timeout | null,
      calendarOptions: {
        // todo depends on screen height
        limit: 7,
      },
    };
  },

  computed: {
    meetingSelectorDate() {
      return new Date(this.fromDate.toISOString());
    },

    monthAndYear() {
      return this.fromDate.format('MMMM YYYY');
    },

    showUntilDate(): Moment {
      return moment(this.fromDate).add(this.nbDaysToAdd, 'days');
    },

    stepInDays(): number {
      return this.nbDaysToAdd + 1;
    },

    isPreviousMonthBtnDisabled(): boolean {
      const currentDate = moment();
      const displayedDate = moment(this.fromDate);
      return displayedDate.isSameOrBefore(currentDate);
    },

    availableDays(): MeetingsDay[] {
      return generateCalendarSlots({
        fromDate: this.fromDate,
        toDate: this.showUntilDate,
        unavailableTimeRanges: this.scheduledTimes,
      });
    },
  },

  watch: {
    async fromDate() {
      await this.fetchUserSchedule();
    },

    lessons(
      nextValues: MeetingSlot[] | MeetingSlot,
      previousValues: MeetingSlot[] | MeetingSlot
    ) {
      const newLessons =
        nextValues instanceof Array ? nextValues : [nextValues];
      const oldLessons =
        previousValues instanceof Array ? previousValues : [previousValues];
      this.$emit('selectLessonTime', newLessons);
      const isLessonTimeAdded = newLessons.length > oldLessons.length;
      const [changedValue] = isLessonTimeAdded
        ? differenceBy(newLessons, oldLessons, 'date')
        : differenceBy(oldLessons, newLessons, 'date');
      const changedMoment = moment(changedValue.date);
      const nextSlotMoment = changedMoment.add(this.additionalTime, 'minutes');

      if (isLessonTimeAdded) {
        this.scheduledTimes.push({
          since: nextSlotMoment.toISOString(),
          until: moment(nextSlotMoment)
            .add(this.additionalTime, 'minutes')
            .toISOString(),
        });
      } else {
        // time unselected
        this.scheduledTimes = this.scheduledTimes.filter(
          ({ since }) => !moment(since).isSame(nextSlotMoment)
        );
      }
    },
  },

  async mounted() {
    await this.fetchUserSchedule();
    this.initAutoRefreshSchedule();
  },

  beforeDestroy() {
    if (this.autoRefreshId) {
      clearTimeout(this.autoRefreshId);
    }
  },

  methods: {
    closeDialog() {
      this.$emit('closeCalendar');
    },

    initAutoRefreshSchedule() {
      const minutesUntilThreshold =
        Math.abs(this.fromDate.get('minutes') - this.additionalTime) || 30; // 30 min if 0 minutes
      const msUntilThreshold = minutesUntilThreshold * 60000;
      this.autoRefreshId = setTimeout(async () => {
        await this.fetchUserSchedule();
        this.initAutoRefreshSchedule();
      }, msUntilThreshold);
    },

    async fetchUserSchedule() {
      this.$emit('set-loading', true);
      try {
        const { scheduledTimes, isSuccess, message } = await this.$api(
          'user/schedule/fetch',
          {
            timeMin: this.fromDate.toISOString(),
            timeMax: moment(this.fromDate)
              .add(this.nbDaysToAdd, 'days')
              .toISOString(),
            userId: this.value,
          }
        );
        if (!isSuccess && message) {
          this.$emit('showSnackbar', { isSuccess, message });
        }
        this.scheduledTimes = scheduledTimes ?? [];
      } catch (err) {
        this.$logger.error('fetchUserCalendarConfig err', err);
      } finally {
        this.$emit('set-loading', false);
      }
    },

    nextDate() {
      this.fromDate = moment(this.fromDate).add(this.stepInDays, 'days');
    },

    prevDate() {
      const today = moment().format('YYYY-MM-DD');
      const fromDate = moment(this.fromDate).subtract(this.stepInDays, 'days');
      if (moment(fromDate, 'YYYY-MM-DD').isBefore(today)) {
        // don't show dates before today
        return;
      }
      this.fromDate = fromDate;
    },

    prevMonth() {
      this.fromDate = this.fromDate.clone().subtract(1, 'month');
    },

    nextMonth() {
      this.fromDate = this.fromDate.clone().add(1, 'month');
    },
  },
});
</script>

<style lang="scss">
#lessonsCalendar {
  position: relative;
}

#calendarContainer {
  border-radius: $btn-border-radius;
}

#meetingContainer {
  scroll-behavior: smooth;
}

// inside meeting-selector class
.tab__loading {
  top: 49px;
}

.day {
  margin-bottom: 12px;
}
</style>
