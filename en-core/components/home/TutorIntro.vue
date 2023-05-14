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

  data() {
    return {
      playerWidth: 950,
      playerHeight: 550,
    };
  },

  computed: {
    // TODO screen plugin for client side
    // screenBreakpoint(): string {
    //   console.log(this.$vuetify.breakpoint);
    //   return this.$vuetify.breakpoint.name;
    // },
    // playerWidth(): number {
    //   console.log('playerWidth br name: ', this.$vuetify.breakpoint.name);
    //   switch (this.$vuetify.breakpoint.name) {
    //     case 'sm':
    //       return 400;
    //     case 'md':
    //       return 800;
    //     case 'lg':
    //       return 950;
    //     case 'xl':
    //       return 1000;
    //     default: // xs
    //       return 350;
    //   }
    // },
    // playerHeight(): number {
    //   switch (this.$vuetify.breakpoint.name) {
    //     case 'sm':
    //       return 360;
    //     case 'md':
    //       return 450;
    //     case 'lg':
    //       return 550;
    //     case 'xl':
    //       return 740;
    //     default: // xs
    //       return 260;
    //   }
    // },
  },
});
</script>
