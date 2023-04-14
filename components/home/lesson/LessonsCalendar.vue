<template>
  <section id="calendarMonth">
    <section class="d-flex justify-center align-center">
      <v-btn icon large @click="prevMonth">
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        <v-icon color="#39adee">mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text-center">{{ `${monthAndYear}` }}</span>
      <v-btn icon large @click="nextMonth">
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        <v-icon color="#39adee">mdi-chevron-right</v-icon>
      </v-btn>
    </section>
    <!-- <v-btn class="black--text text-capitalize" large icon absolute top right>
      <v-icon>mdi-close</v-icon>
    </v-btn> -->

    <v-divider class="mt-3"></v-divider>

    <meeting-selector
      v-model="lessons"
      :date="meetingSelectorDate"
      :meetings-days="availableDays"
      :calendar-options="calendarOptions"
      :multi="true"
      :loading="isLoading"
      @next-date="nextDate"
      @previous-date="prevDate"
    >
      <template #loading> Loading ... </template>
    </meeting-selector>
  </section>
</template>

<script lang="ts">
import moment, { Moment } from 'moment';
import Vue, { VueConstructor } from 'vue';
import type MeetingsDay from 'vue-meeting-selector/src/interfaces/MeetingsDay.interface';
import MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';
import generateCalendarSlots from '@/utils/slots-generator';
import {
  ILessonCalendar,
  ScheduledTimes,
} from '@/types/components/lesson-calendar';

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
  },

  data() {
    return {
      fromDate: moment(), // now by default
      nbDaysToAdd: 6,
      lessons: [] as MeetingSlot[],
      scheduledTimes: [] as ScheduledTimes,
      calendarOptions: {
        limit: 8,
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

    availableDays(): MeetingsDay[] {
      console.log({
        fromDate: this.fromDate,
        toDate: this.showUntilDate,
      });

      return generateCalendarSlots({
        fromDate: this.fromDate,
        toDate: this.showUntilDate,
        unavailableTimeRanges: this.scheduledTimes,
      });
    },
  },

  watch: {
    lessons(values) {
      console.log({ lessons: values });
    },
  },

  async mounted() {
    await this.fetchUserSchedule();
  },

  methods: {
    closeDialog() {
      this.$emit('closeCalendar');
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
        console.log({ scheduledTimes });
        this.scheduledTimes = scheduledTimes ?? [];
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('fetchUserCalendarConfig err', err);
      } finally {
        this.$emit('set-loading', false);
      }
    },

    async nextDate() {
      this.$emit('set-loading', true);
      // todo
      this.$emit('set-loading', false);
    },

    async prevDate() {
      this.$emit('set-loading', true);
      // todo
      this.$emit('set-loading', false);
    },

    async prevMonth() {
      const currentDate = moment();
      const displayedDate = this.fromDate;
      console.log({
        currentDate,
        displayedDate,
        p: currentDate.isBefore(displayedDate),
      });
      if (currentDate.isBefore(displayedDate)) {
        // don't show old events
        return;
      }

      this.fromDate = this.fromDate.subtract(1, 'month');
    },

    async nextMonth() {
      this.fromDate = this.fromDate.add(1, 'month');
    },

    async bookLesson(...args: any) {
      console.log('bookLesson', { args });
      // await this.$api('auth', 'login', { email: '' });
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

// inside meeting-selector class
.tab__loading {
  top: 49px;
}

.day {
  margin-bottom: 12px;
}
</style>
