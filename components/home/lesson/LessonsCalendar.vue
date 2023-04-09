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
import moment from 'moment';
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
  },

  data() {
    return {
      fromDate: moment(), // now by default
      nbDaysToDisplay: 7,
      showUntilDate: moment(this.fromDate).add(this.nbDaysToDisplay, 'days'),
      lessons: [] as MeetingSlot[],
      scheduledTimes: [] as ScheduledTimes,
      isLoading: false,
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

    availableDays(): MeetingsDay[] {
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
      const isUserAuthenticated: boolean =
        this.$store.getters['user/isAuthenticated'];

      if (!isUserAuthenticated) {
        return;
      }

      this.isLoading = true;
      try {
        const { scheduledTime, isSuccess, message } = await this.$api(
          'user/schedule/fetch',
          {
            timeMin: this.fromDate.toISOString(),
            timeMax: this.fromDate
              .add(this.nbDaysToDisplay, 'days')
              .toISOString(),
            userId: this.value,
          }
        );
        if (!isSuccess && message) {
          this.$emit('showSnackbar', { isSuccess, message });
          this.isLoading = false;
          return;
        }
        console.log({ scheduledTime });
        this.scheduledTimes = scheduledTime;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('fetchUserCalendarConfig err', err);
      }
      this.isLoading = false;
    },

    // async fetchEvents() {
    //   this.isLoading = true;
    //   try {
    //     const { events, isSuccess, message } = await this.$api(
    //       'google/calendar/events',
    //       {
    //         timeMin: this.fromDate.toISOString(),
    //         timeMax: this.showUntilDate.toISOString(),
    //       }
    //     );

    //     if (!isSuccess && message) {
    //       this.$emit('showSnackbar', { isSuccess, message });
    //       return;
    //     }

    //     if (events?.length) {
    //       this.events = events;
    //     }
    //   } catch (err) {
    //     console.error('fetchEvents err', err);
    //   }
    //   this.isLoading = false;
    // },

    async nextDate() {
      this.isLoading = true;
      // const start: Time = {
      //   hours: 8,
      //   minutes: 0,
      // };
      // const end: Time = {
      //   hours: 16,
      //   minutes: 0,
      // };
      // const dateCopy = new Date(this.date);
      // const newDate = new Date(dateCopy.setDate(dateCopy.getDate() + 7));
      // this.date = newDate;
      // this.lessonDays = (await slotsGeneratorAsync(
      //   newDate,
      //   this.nbDaysToDisplay,
      //   start,
      //   end,
      //   30
      // )) as any;
      this.isLoading = false;
    },

    async prevDate() {
      this.isLoading = true;
      // const start: Time = {
      //   hours: 8,
      //   minutes: 0,
      // };
      // const end: Time = {
      //   hours: 16,
      //   minutes: 0,
      // };
      // const dateCopy = new Date(this.date);
      // dateCopy.setDate(dateCopy.getDate() - 7);
      // const formattingDate = (dateToFormat: Date): String => {
      //   const d = new Date(dateToFormat);
      //   const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
      //   const month =
      //     d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
      //   const year = d.getFullYear();
      //   return `${year}-${month}-${day}`;
      // };
      // const newDate =
      //   formattingDate(new Date()) >= formattingDate(dateCopy)
      //     ? new Date()
      //     : new Date(dateCopy);
      // this.date = newDate;
      // this.lessonDays = (await slotsGeneratorAsync(
      //   newDate,
      //   this.nbDaysToDisplay,
      //   start,
      //   end,
      //   30
      // )) as any;
      this.isLoading = false;
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
