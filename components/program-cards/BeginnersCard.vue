<template>
  <section id="beginnersCard">
    <img src="/beginners_card_bg.svg" alt="Word 'learning' in the hands" />

    <section
      class="beginners-card d-flex flex-column justify-end align-center px-10 py-5"
    >
      <h4 class="beginners-card-title mb-5">
        {{ $t('program.beginners.title') }}
      </h4>
      <p class="beginners-card-description text-center">
        {{ $t('program.beginners.description') }}
      </p>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BeginnersCard',
});
</script>

<style lang="scss">
#beginnersCard {
  position: relative;

  .beginners-card {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;

    &-title {
      color: $main-title;
      font-family: Kalam, sans-serif;
      font-weight: bold;
      font-size: 5em;
    }

    &-description {
      color: $main-text-color;
      font-family: Inter, sans-serif;
      font-weight: 500;
      font-size: 1.2em;
    }
  }
}
</style>
