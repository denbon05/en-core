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
          <span class="text-center">{{ `${month} ${year}` }}</span>
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

      <MeetingSelector
        v-model="lesson"
        :date="date"
        :meetings-days="lessonDays"
        :calendar-options="calendarOptions"
        :multi="true"
        @next-date="nextDate"
        @previous-date="prevDate"
      />

      <v-card-actions class="d-flex justify-end">
        <v-btn class="btn-sm" @click="bookLesson">BOOK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import type MeetingsDay from 'vue-meeting-selector/src/interfaces/MeetingsDay.interface';
import type Time from 'vue-meeting-selector/src/interfaces/Time.interface';
import { ILessonCalendar } from '@/types/lesson-calendar';
// TODO use actual data instead of slotsGenerator
import slotsGenerator from '@/utils/slotsGenerator';
import MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';

const slotsGeneratorAsync = (
  d: Date, // date
  n: number, // nbDaysToDisplay
  start: Time,
  end: Time,
  timesBetween: number
): Promise<MeetingsDay[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(slotsGenerator(d, n, start, end, timesBetween));
    }, 100);
  });
// TODO move all schedule logic to the class TutorSchedule
export default (Vue as VueConstructor<Vue & ILessonCalendar>).extend({
  name: 'LessonsCalendar',

  props: {
    value: {
      required: true,
      type: Boolean,
    },
  },

  data() {
    return {
      lessonDays: [] as MeetingsDay[],
      date: new Date(), // now by default
      lesson: null as MeetingSlot | null,
      // lessonFromTime: {
      //   hours: 8,
      //   minutes: 0,
      // },
      // lessonToTime: {
      //   hours: 16,
      //   minutes: 0,
      // },
      isLoading: false,
      nbDaysToDisplay: 7, // computed?
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

    month() {
      return this.date.toLocaleString('default', { month: 'long' });
    },

    year() {
      return this.date.getFullYear();
    },
  },

  watch: {
    lesson(values) {
      console.log({ lesson: values });
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
    await this.fetchEvents();
  },

  methods: {
    closeDialog() {
      this.$emit('closeCalendar');
    },

    async fetchEvents() {
      this.isLoading = true;
      try {
        const res = await this.$api('google/calendar/events', {
          timeMin: new Date().toISOString(),
          // timeMax:
        });
        console.log('fetched events', res);
      } catch (err) {
        console.error(err);
      }
      // console.log('AAA: ', this.lessonDays);
      this.isLoading = false;
    },

    async nextDate() {
      this.isLoading = true;
      const start: Time = {
        hours: 8,
        minutes: 0,
      };
      const end: Time = {
        hours: 16,
        minutes: 0,
      };
      const dateCopy = new Date(this.date);
      const newDate = new Date(dateCopy.setDate(dateCopy.getDate() + 7));
      this.date = newDate;
      this.lessonDays = (await slotsGeneratorAsync(
        newDate,
        this.nbDaysToDisplay,
        start,
        end,
        30
      )) as any;
      this.isLoading = false;
    },

    async prevDate() {
      this.isLoading = true;
      const start: Time = {
        hours: 8,
        minutes: 0,
      };
      const end: Time = {
        hours: 16,
        minutes: 0,
      };
      const dateCopy = new Date(this.date);
      dateCopy.setDate(dateCopy.getDate() - 7);
      const formattingDate = (dateToFormat: Date): String => {
        const d = new Date(dateToFormat);
        const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
        const month =
          d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
      };
      const newDate =
        formattingDate(new Date()) >= formattingDate(dateCopy)
          ? new Date()
          : new Date(dateCopy);
      this.date = newDate;
      this.lessonDays = (await slotsGeneratorAsync(
        newDate,
        this.nbDaysToDisplay,
        start,
        end,
        30
      )) as any;
      this.isLoading = false;
    },

    async updateCalendarByMonth(_monthIdx: number) {
      // TODO
      // this.lessonDays =
      // const res = await this.$api('ping', 'calendar', { some: 'param' });
      // console.log({ clientRes: res });
    },

    async prevMonth() {
      const currentDate = new Date();
      const displayedDate = this.date;
      console.log({
        currentDate,
        displayedDate,
        p: currentDate < displayedDate,
      });
      // if (currentDate > displayedDate) {
      //   return;
      // }

      const prevMonthIdx = displayedDate.getMonth();
      this.date = new Date(this.date.setMonth(prevMonthIdx - 1));
      // await this.updateCalendarByMonth(prevMonthIdx);
      // await this.$api('google/auth', 'login');
    },

    async nextMonth() {
      const nextMonthIdx = this.date.getMonth();

      console.log('before: ', this.date);
      this.date = new Date(this.date.setMonth(nextMonthIdx + 1));
      console.log('after: ', this.date);
      await this.updateCalendarByMonth(nextMonthIdx);
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
  // height: 800px;
}

// #calendarMonth button {
//   position: absolute;
//   right: 20px;
//   top: 15px;
// }
</style>
