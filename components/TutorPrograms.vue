<template>
  <section id="programsAbout">
    <img
      id="programsBG"
      src="/tutor_wave.svg"
      alt="Wave rectangle with arrow to the programs"
    />

    <div class="programs">
      <div class="ma-0 ma-md-5 ma-lg-10 pa-5 pa-lg-10">
        <h3
          class="ml-0 ml-md-5 ml-lg-15 pl-0 pl-md-5 pt-5 mt-md-10 programs-tagline"
        >
          {{ $t('tutor.tagline') }}
        </h3>
      </div>

      <div class="d-flex justify-end">
        <h4 class="text-h4 programs-audience">
          {{ $t('tutor.audience') }}
        </h4>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TutorPrograms',
});
</script>

<style lang="scss">
#programsAbout {
  position: relative;
  color: $main-text-color;
  background: $app-bg-color-root;
  height: 500px;

  #programsBG {
    width: 100%;
  }

  .programs {
    position: absolute;
    top: 0;
    width: 100%;

    &-tagline {
      font-family: Inter, sans-serif !important;
      font-style: italic;
      font-weight: 500;
      font-size: 2.2rem;
    }

    &-audience {
      font-family: Inter, sans-serif !important;
      font-style: italic;
      font-weight: 500;
      // position: absolute;
      // bottom: 0;
      // right: 300px;
      flex-basis: 50%;
    }
  }
}
</style>
