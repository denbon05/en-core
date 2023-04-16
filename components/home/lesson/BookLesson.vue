<template>
  <v-dialog id="bookLesson" v-model="isVisible" max-width="900" rounded="xl">
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
              @select-tutor="selectTutor"
              @set-loading="setLoading"
            />
          </v-stepper-content>
          <v-stepper-content step="2">
            <LessonsCalendar
              v-if="selectedTutorId"
              v-model="selectedTutorId"
              :is-loading="isLoading"
              @set-loading="setLoading"
              @selectLessonTime="selectLessonTime"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

      <v-card-actions class="justify-end mr-10">
        <v-btn
          v-if="isBookBtnVisible"
          :disabled="!isLessonTimeSelected"
          color="primary"
          @click="bookLesson"
          >{{ $t('action.book.lesson') }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import MeetingSlot from 'vue-meeting-selector/src/interfaces/MeetingSlot.interface';
import AvailableTutors from './AvailableTutors.vue';
import LessonsCalendar from './LessonsCalendar.vue';

export default Vue.extend({
  name: 'BookLesson',

  components: { AvailableTutors, LessonsCalendar },

  inject: ['showSnackbar'],

  props: {
    value: {
      type: Boolean,
      default: true,
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

    isTutorSelected(): boolean {
      return Boolean(this.selectedTutorId);
    },

    isBookBtnVisible(): boolean {
      return this.isTutorSelected;
    },

    isLessonTimeSelected(): boolean {
      return Boolean(this.lessonTimes.length);
    },
  },

  methods: {
    closeDialog() {
      this.isVisible = false;
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
      //
    },
  },
});
</script>

<style lang="scss"></style>
