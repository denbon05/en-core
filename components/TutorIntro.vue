<template>
  <section id="tutorIntro" class="d-flex justify-center mb-10">
    <iframe
      :width="playerWidth"
      :height="playerHeight"
      src="https://www.youtube.com/embed/gsQi_txzbuY"
    >
    </iframe>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TutorIntro',

  computed: {
    playerWidth(): number {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          return 400;
        case 'md':
          return 500;
        case 'lg':
          return 600;
        case 'xl':
          return 800;
        default: // xs
          return 300;
      }
    },
    playerHeight(): number {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          return 360;
        case 'md':
          return 450;
        case 'lg':
          return 550;
        case 'xl':
          return 740;
        default: // xs
          return 260;
      }
    },
  },
});
</script>
