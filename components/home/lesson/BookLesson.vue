<template>
  <v-dialog id="bookLesson" v-model="isVisible" max-width="900" rounded="xl">
    <ConfirmDialogVue v-model="isConfirmVisible" @confirm="redirectToAuthPage">
      {{ $t('question.auth') }}
    </ConfirmDialogVue>
    <v-card :loading="isLoading" color="#FFF" min-height="700">
      <v-stepper v-model="step" flat>
        <v-stepper-header>
          <v-stepper-step
            :complete="isTutorSelected"
            class="flex-grow-1"
            editable
            step="1"
          >
            {{ step1 }}
          </v-stepper-step>

          <v-stepper-step
            class="flex-grow-1"
            :editable="isTutorSelected"
            step="2"
          >
            {{ step2 }}
          </v-stepper-step>

          <v-stepper-step
            step="3"
            complete-icon="mdi-close"
            complete
            @click="closeDialog"
          >
            <v-btn large icon absolute top left text plain> </v-btn>
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <AvailableTutors
              v-model="selectedTutorId"
              :is-loading="isLoading"
              :user-should-be-authorized="userShouldBeAuthorized"
              @select-tutor="selectTutor"
              @set-loading="setLoading"
            />
          </v-stepper-content>
          <v-stepper-content step="2">
            <LessonsCalendar
              v-if="selectedTutorId"
              v-model="selectedTutorId"
              :is-loading="isLoading"
              :can-user-select-few-lessons="canUserSelectFewLessons"
              :additional-time="additionalTime"
              @set-loading="setLoading"
              @selectLessonTime="selectLessonTime"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

      <v-card-actions class="justify-end mr-10">
        <v-btn
          v-if="isBookBtnVisible"
          :disabled="isBookBtnDisabled"
          color="primary"
          @click="bookLesson"
        >
          <slot name="action">
            {{ $tc('action.book.lesson', lessonAmount) }}
          </slot>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { LessonType } from '.prisma/client';
import Vue from 'vue';
import MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';
import AvailableTutors from './AvailableTutors.vue';
import LessonsCalendar from './LessonsCalendar.vue';
import ConfirmDialogVue from '@/components/common/ConfirmDialog.vue';
import { BookParam } from '@/types/api/lesson';
import Lessons from '@/utils/lesson';
import { stepInMinutes } from '@/utils/slots'; // todo see the file

export default Vue.extend({
  name: 'BookLesson',

  components: { AvailableTutors, LessonsCalendar, ConfirmDialogVue },

  inject: ['showSnackbar'],

  props: {
    value: {
      type: Boolean,
      default: true,
    },
    lessonType: {
      type: String,
      validator: (value: string) => ['ONCE', 'TRIAL', 'WEEKLY'].includes(value),
      default: 'ONCE',
    },
  },

  data() {
    return {
      isLoading: true,
      isUserAuthenticated: this.$store.getters['user/isAuthenticated'],
      step: 1,
      // 1st step - select tutor
      step1: this.$t('action.select', {
        name: this.$t('tutor.title').toLowerCase(),
      }),
      // 1nd step - select date time
      step2: this.$t('action.select', {
        name: this.$t('calendar.time').toLowerCase(),
      }),
      selectedTutorId: null as number | null,
      lessonTimes: [] as MeetingSlot[],

      isConfirmVisible: false,
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

    lessonAmount(): number {
      return this.lessonTimes.length;
    },

    /**
     * Default lesson time 30 minutes.
     */
    additionalTime(): number {
      if (this.lessonType === 'TRIAL') {
        return 0;
      }
      return stepInMinutes; // 30 minutes
    },

    userShouldBeAuthorized(): boolean {
      return this.lessonType !== 'TRIAL';
    },

    canUserSelectFewLessons(): boolean {
      return this.lessonType !== 'TRIAL';
    },

    isTutorSelected(): boolean {
      return Boolean(this.selectedTutorId);
    },

    isBookBtnVisible(): boolean {
      return this.isTutorSelected;
    },

    isBookBtnDisabled(): boolean {
      return !this.isLessonTimeSelected || this.isLoading;
    },

    isLessonTimeSelected(): boolean {
      return Boolean(this.lessonTimes.length);
    },
  },

  methods: {
    closeDialog() {
      this.isVisible = false;
    },

    redirectToAuthPage() {
      this.$router.push({
        path: '/auth',
      });
      const intervalId = setInterval(async () => {
        // wait until user auth
        if (this.$store.getters['user/isAuthenticated']) {
          clearInterval(intervalId);
          this.$router.push('/');
          await this.bookLesson();
        }
      }, 500);
    },

    selectTutor(tutorId: number) {
      this.selectedTutorId = tutorId;
      if (tutorId) {
        this.step = 2;
      }
    },

    selectLessonTime(lessonTimes: MeetingSlot[]) {
      this.lessonTimes = lessonTimes;
    },

    setLoading(isLoading = false) {
      this.isLoading = isLoading;
    },

    async bookLesson() {
      this.isLoading = true;
      const lessons = new Lessons(
        this.lessonType as Cast<LessonType>
      ).toTimeScheduled(this.lessonTimes);

      try {
        const { isSuccess, message: msg } = await this.$api(
          'user/lesson/book',
          {
            type: this.lessonType,
            lessonsData: lessons,
            tutorId: this.selectedTutorId,
          } as BookParam
        );

        const count = lessons.length;

        if (isSuccess) {
          // reset selected
          this.isVisible = false;
          this.selectedTutorId = null;
          this.step = 1; // select tutor step
        }
        const message = !isSuccess
          ? msg
          : this.$tc('success.lesson.book', count, { count });
        this.showSnackbar({ isSuccess, message });
      } catch (err) {
        this.$logger.error(err);
        if (err.statusCode === 401) {
          // unauthenticated
          this.isConfirmVisible = true;
          return;
        }
        const message =
          this.$t(`error.http.${err.statusCode}`) ||
          this.$t(`error.http.common`);
        this.showSnackbar({ isSuccess: false, message });
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
