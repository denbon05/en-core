<template>
  <section id="worksCard">
    <img src="/work_card_bg.svg" alt="A queen and a pawn on a chessboard" />

    <div
      class="works-contend px-10 py-5 d-flex flex-column align-end justify-end"
    >
      <h4 class="works-contend-title">{{ $t('program.work.title') }}</h4>
      <p class="works-contend-description">
        {{ $t('program.work.description') }}
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WorksCard',
});
</script>

<style lang="scss">
#worksCard {
  position: relative;

  .works-contend {
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
      width: 50%;
    }
  }
}
</style>
