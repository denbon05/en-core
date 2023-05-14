<template>
  <section id="programsAbout">
    <section id="programShort">
      <!-- todo: revert bg with smAndDown screen width -->
      <img
        id="programsBG"
        src="/tutor_wave.svg"
        alt="Wave rectangle with arrow to the programs"
      />

      <div
        id="programs"
        class="d-flex flex-column justify-start justify-md-space-between"
      >
        <div>
          <h3
            class="ml-0 pl-10 ml-lg-15 mt-10 mt-md-15 mb-15 mb-md-0 programs-tagline"
          >
            {{ $t('tutor.tagline') }}
          </h3>
        </div>

        <div class="d-flex justify-end mt-10 mt-md-0">
          <h4 class="pr-5 pr-md-10 programs-audience">
            {{ $t('tutor.audience') }}
          </h4>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TutorPrograms',

  props: {
    smAndDown: {
      required: true,
      type: Boolean,
    },
  },
});
</script>

<style lang="scss">
#programsAbout {
  color: $main-text-color;
  position: relative;
  background: $app-bg-color-root;
  height: 500px;

  #programShort {
    #programsBG {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    #programs {
      position: absolute;
      top: 0;
      width: 100%;
      height: 80% !important;

      &-tagline {
        font-family: Inter, sans-serif !important;
        font-style: italic;
        font-weight: 500;
        font-size: 1.7em;
      }

      &-audience {
        font-family: Inter, sans-serif !important;
        font-style: italic;
        font-weight: 500;
        flex-basis: 60%;
        font-size: 2rem;
      }
    }
  }
}

.programs-audience {
  font-size: 2rem;
  font-weight: 400;
}
</style>
