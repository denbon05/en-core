<template>
  <section id="tutorPlatform">
    <section id="platforms">
      <div class="d-flex justify-space-between">
        <div class="d-flex flex-column">
          <div id="platformDescription" class="text-center mt-10 pa-md-10">
            {{ $t('platform.description') }}
          </div>
          <div class="stickers d-flex justify-space-between">
            <img
              class="sticker px-5 pb-5"
              src="/tutoring_sticker.png"
              alt="Sticker with text 'Tutoring'"
            />
            <img
              class="sticker px-5 pt-15"
              src="/zoom_sticker.png"
              alt="Sticker with text 'Zoom'"
            />
          </div>
          <img
            class="sticker pa-5 pl-15 align-self-end"
            src="/course_sticker.png"
            alt="Sticker with text 'Online course'"
          />
        </div>

        <div class="d-flex flex-column">
          <img
            src="/education_sticker.png"
            alt="Sticker with text 'Online education'"
            class="sticker"
          />
          <img
            class="sticker pa-5"
            src="/teaching_sticker.png"
            alt="Sticker with text 'teaching'"
          />
        </div>
      </div>
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
// TODO define styles up to sm
$platform-description-font-size: 2em;

#platforms {
  position: relative;
}

#platformDescription {
  color: $main-text-color;
  font-family: Inter, sans-serif;
  font-style: italic;
  font-weight: 500;
  font-size: 1rem;
}

.sticker {
  width: 150px;
  object-fit: contain;
}

// .stickers {
//   position: absolute;
//   top: calc($platform-description-font-size);
//   left: 0;
// }
</style>
