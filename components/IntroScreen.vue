<template>
  <section id="introScreen">
    <img
      :src="bgImg"
      alt="Desk with books, cubes and apple."
      class="intro-bg"
      :height="introHeight"
    />

    <section class="intro" width="100%">
      <p class="intro-tagline">{{ $t('intro.tagline') }}</p>

      <section
        class="d-flex flex-column"
        :class="{ 'justify-center': smAndDown, 'justify-end': !smAndDown }"
      >
        <section class="d-flex flex-column align-center my-10 ml-5">
          <h1 class="intro-name">{{ $t('intro.name') }}</h1>
          <h1 class="intro-description">
            {{ $t('intro.description') }}
          </h1>
        </section>

        <h3 class="mr-5 mr-md-15 intro-representation d-flex justify-end">
          {{ $t('intro.representation') }}
        </h3>
      </section>

      <section id="introAction" class="d-flex flex-column align-center">
        <v-btn class="intro-action my-3" elevation="2" x-large>
          <span class="mx-5 my-5">{{ $t('intro.action') }}</span>
        </v-btn>

        <span class="text-h6 intro-price">{{
          $t('lesson.price.trial', { amount })
        }}</span>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IntroScreen',

  props: {
    smAndDown: {
      required: true,
      type: Boolean,
    },
  },

  data: () => ({
    amount: 2, // todo: make dynamic data from settled by admin
    introHeight: 0,
  }),

  computed: {
    bgImg(): string {
      return this.smAndDown ? '/intro_screen_mobile.svg' : '/intro_screen.svg';
    },
  },

  mounted() {
    // to count window size
    const appBar = document.getElementById('appBar');
    this.introHeight = window.innerHeight - (appBar?.clientHeight || 0);
    // todo: event on resize
  },
});
</script>

<style scoped lang="scss">
#introScreen {
  position: relative;
}

.intro {
  width: 100%;
  height: 100%;
  position: absolute;
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

  &-action {
    height: $app-bar-height !important;
    width: 285px;
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    font-size: 1.7em;
    border-radius: $btn-radius;
  }

  &-price {
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    font-size: 1.3em;
  }
}
</style>
