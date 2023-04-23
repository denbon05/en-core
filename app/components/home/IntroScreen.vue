<template>
  <section id="introScreen">
    <template v-if="isBookLessonOpen">
      <BookLesson v-model="isBookLessonOpen"
    /></template>

    <section class="intro h-100 d-flex flex-column justify-space-around">
      <p class="intro-tagline">{{ $t('main.tagline') }}</p>

      <section
        class="d-flex flex-column"
        :class="{ 'justify-center': smAndDown, 'justify-end': !smAndDown }"
      >
        <section class="d-flex flex-column align-center my-10 ml-5">
          <h1 class="intro-name">{{ $t('main.name') }}</h1>
          <h1 class="intro-description">
            {{ $t('main.description') }}
          </h1>
        </section>

        <h3 class="mr-5 mr-md-15 intro-representation d-flex justify-end">
          {{ $t('main.representation') }}
        </h3>
      </section>

      <section id="introAction" class="d-flex flex-column align-center">
        <v-btn class="btn-lg my-3" elevation="2" @click.stop="openBookLesson">
          <span class="mx-5 my-5">{{ $t('main.action') }}</span>
        </v-btn>

        <span class="text-h6 intro-price">{{
          $t('lesson.trial.price', { amount })
        }}</span>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import BookLesson from './lesson/BookLesson.vue';

export default Vue.extend({
  name: 'IntroScreen',

  components: { BookLesson },

  props: {
    smAndDown: {
      required: true,
      type: Boolean,
    },
  },

  data() {
    return {
      amount: 2, // todo: make dynamic data from settled by admin
      introHeight: 0,
      isBookLessonOpen: false,
    };
  },

  mounted() {
    // to count window size
    const appBar = document.getElementById('appBar');
    this.introHeight = window.innerHeight - (appBar?.clientHeight || 0);
    // todo: event on resize
  },

  methods: {
    openBookLesson() {
      this.isBookLessonOpen = true;
    },
    closeBookLesson() {
      this.isBookLessonOpen = false;
    },
  },
});
</script>

<style scoped lang="scss">
#introScreen {
  background-image: url('/intro_screen.svg');
  background-size: cover;
  width: 100vw;
  height: calc(100vh - 70px);
  min-height: 700px;
}

.intro {
  z-index: 1;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  &-bg {
    z-index: 0;
    width: 100%;
    object-fit: cover;
  }

  &-tagline {
    color: $main-text-color;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 1.5em;
  }

  &-name {
    color: $main-title;
    font-family: 'Kalam', cursive !important;
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 2.8em;
  }

  &-description {
    color: $main-title;
    font-family: 'Inter', sans-serif !important;
    font-style: italic;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 2.8em;
  }

  &-representation {
    color: $main-text-color;
    font-family: 'Inter', sans-serif !important;
    font-size: 2.5em;
    font-weight: 500;
  }

  &-price {
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    font-size: 1.3em;
  }
}
</style>
