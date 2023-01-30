<template>
  <section id="tutorPlatform">
    <section id="platforms" class="d-flex justify-md-space-between">
      <div id="platformDescription" class="text-center mt-10">
        {{ $t('platform.description') }}
      </div>
      <img
        src="/education_sticker.png"
        alt="Sticker with text 'Online education'"
        class="sticker"
      />
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TutorPlatform',

  props: {
    // todo: use it for table and mobile window sizes
    smAndDown: {
      required: true,
      type: Boolean,
    },
  },

  // computed: {
  //   stickerHeight(): number {
  //       // Use in computed property
  //       switch (this.vuetify.breakpoint.name) {
  //         case 'xs': return '220px'
  //         case 'sm': return '400px'
  //         case 'md': return '500px'
  //         case 'lg': return '600px'
  //         case 'xl': return '800px'
  //         default:
  //           return
  //       }
  //   }
  // }
});
</script>

<style lang="scss">
#platformDescription {
  color: $main-text-color;
  font-family: Inter, sans-serif;
  font-style: italic;
  font-weight: 500;
  font-size: 2em;
  flex-basis: 50%;
}

.sticker {
  width: 25vw;
  height: 24em;
  min-width: 240px;
  min-height: 260px;
}
</style>
