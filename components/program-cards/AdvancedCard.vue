<template>
  <section id="advancedCard">
    <img src="/advanced_card_bg.svg" alt="Many dors" />

    <div
      class="advanced-content d-flex flex-column justify-end align-end px-10 py-5"
    >
      <h4 class="advanced-content-title">{{ $t('program.advanced.title') }}</h4>
      <h4 class="advanced-content-description text-center">
        {{ $t('program.advanced.description') }}
      </h4>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AdvancedCard',
});
</script>

<style lang="scss">
#advancedCard {
  position: relative;

  .advanced-content {
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
