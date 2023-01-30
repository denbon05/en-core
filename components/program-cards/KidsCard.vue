<template>
  <section id="kidsCard">
    <div id="kidsBg">
      <img src="/kids_card_bg.svg" alt="Letters on the rope" />
    </div>

    <section
      class="kids-card-content d-flex flex-column align-between justify-space-between px-15 py-5"
    >
      <div>
        <h3 class="kids-card-title">{{ $t('program.kids.title') }}</h3>
      </div>

      <div class="d-flex justify-center px-5 px-md-10 text-center">
        <p class="kids-card-description">
          {{ $t('program.kids.description') }}
        </p>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'KidsCard',
});
</script>

<style lang="scss">
#kidsCard {
  position: relative;
  // background-image: url('/kids_card_bg.svg');
  // opacity: 1;
  // transition: opacity 0.5s ease-out;
  // height: 100%;

  // &:hover {
  //   opacity: 0.5;

  //   .kids-card-title {
  //     opacity: 1 !important;
  //     transform: translateX(30%);
  //   }

  //   .kids-card-description {
  //     opacity: 0;
  //   }
  // }

  .kids-card-content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;

    .kids-card-title {
      color: $main-text-color;
      font-family: Kalam, sans-serif;
      font-weight: bold;
      font-size: 5em;
      transition: transform 0.5s ease-in-out;
    }

    .kids-card-description {
      color: $main-text-color;
      font-family: Inter, sans-serif;
      font-weight: 500;
      font-size: 1.2em;
      // transition: opacity 0.7s ease-in-out;
    }
  }
}
</style>
