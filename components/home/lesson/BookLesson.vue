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
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
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
      lessonTime: null,
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

    isLessonTimeSelected(): boolean {
      return Boolean(this.lessonTime);
    },
  },

  methods: {
    closeDialog() {
      this.$emit('closeBookLesson');
    },

    selectTutor(tutorId: number) {
      this.selectedTutorId = tutorId;
      if (tutorId) {
        this.step = 2;
      }
    },

    setLoading(isLoading = false) {
      this.isLoading = isLoading;
    },
  },
});
</script>

<style lang="scss"></style>
