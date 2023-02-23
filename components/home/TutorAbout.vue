<template>
  <section id="about">
    <img
      id="tutorImg"
      src="/tutor_about.svg"
      alt="Tutor with a stack of books"
      width="100%"
    />

    <div
      class="tutor d-flex flex-column align-center my-0 my-lg-5 px-5 px-md-10 px-lg-15"
      :class="{ 'tutor-content-absolute': !smAndDown, 'mx-10': smAndDown }"
    >
      <h4 class="tutor-hello my-1 my-lg-3">{{ tutorHello }}</h4>
      <p class="tutor-about px-xl-15">{{ $t('tutor.about') }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TutorAbout',

  props: {
    smAndDown: {
      required: true,
      type: Boolean,
    },
  },

  computed: {
    tutorHello(): string {
      const hiKey = this.smAndDown ? 'hello' : 'nice';
      return this.$t(`tutor.${hiKey}`) as string;
    },
  },
});
</script>

<style lang="scss">
#about {
  position: relative;
  .tutor {
    &-content-absolute {
      position: absolute;
      top: 0;
      width: 60%;
    }

    &-hello {
      font-size: 1.4em;
      color: $main-title;
    }

    &-about {
      color: $main-text-color;
      font-size: 1.4em;
    }
  }
}

#tutorImg {
  z-index: 0;
}

#programs {
  #programsBG {
    width: 100%;
    object-fit: cover;
  }
}
</style>
