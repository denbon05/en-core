<template>
  <section id="mainAction" class="d-flex justify-center">
    <BookLesson v-model="isBookLessonVisible" />
    <v-btn elevation="2" class="btn-lg" @click="openBookLesson">{{
      $tc('action.book.lesson')
    }}</v-btn>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import BookLesson from './lesson/BookLesson.vue';

export default Vue.extend({
  name: 'MainAction',

  components: { BookLesson },

  data() {
    return {
      isBookLessonVisible: false,
    };
  },

  methods: {
    openBookLesson() {
      this.isBookLessonVisible = true;
    },
  },
});
</script>

<style lang="scss">
#mainAction {
  margin: $app-bar-height $app-bar-height;
}
</style>
