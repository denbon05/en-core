<template>
  <v-dialog
    id="lessonsCalendar"
    v-model="isVisible"
    max-width="900"
    rounded="xl"
  >
    <v-card id="calendarContainer" class="pa-10" color="#FFF">
      <v-card-title
        id="calendarMonth"
        class="black--text d-flex justify-center"
      >
        <section>
          <v-btn icon large @click="prevMonth">
            <v-icon color="#39adee">mdi-chevron-left</v-icon>
          </v-btn>
          <span class="text-center">{{ `${monthAndYear}` }}</span>
          <v-btn icon large @click="nextMonth">
            <v-icon color="#39adee">mdi-chevron-right</v-icon>
          </v-btn>
        </section>
        <v-btn
          class="black--text text-capitalize"
          large
          icon
          absolute
          top
          right
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider class="mt-3"></v-divider>

      <meeting-selector
        v-model="lessons"
        :date="fromDate"
        :meetings-days="availableDays"
        :calendar-options="calendarOptions"
        :multi="true"
        :loading="isLoading"
        @next-date="nextDate"
        @previous-date="prevDate"
      >
        <template #loading> Loading ... </template>
      </meeting-selector>

      <v-card-actions class="d-flex justify-end">
        <v-btn class="btn-sm" @click="bookLesson">BOOK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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

// const slotsGeneratorAsync = (
//   d: Date, // date
//   n: number, // nbDaysToDisplay
//   start: Time,
//   end: Time,
//   timesBetween: number
// ): Promise<MeetingsDay[]> =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(slotsGenerator(d, n, start, end, timesBetween));
//     }, 100);
//   });
// TODO move all schedule logic to the class TutorSchedule
export default (Vue as VueConstructor<Vue & ILessonCalendar>).extend({
  name: 'LessonsCalendar',

  inject: ['showSnackbar'],

  props: {
    value: {
      required: true,
      type: Boolean,
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
    isVisible: {
      get(): boolean {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
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
    meeting(values) {
      console.log({ meeting: values });
    },
  },

  async mounted() {
    // this.lessonDays = (await slotsGeneratorAsync(
    //   this.date,
    //   this.nbDaysToDisplay,
    //   this.lessonFromTime,
    //   this.lessonToTime,
    //   30
    // )) as any;
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
          'user/schedule/fetch'
        );

        if (!isSuccess && message) {
          this.$emit('showSnackbar', { isSuccess, message });
          return;
        }

        this.scheduledTimes = scheduledTime;
      } catch (err) {
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
</style>
