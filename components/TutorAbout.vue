<template>
  <section id="about">
    <img
      id="tutorImg"
      src="/tutor_about.svg"
      alt="Tutor with a stack of books"
      width="100%"
    />

    <div class="tutor d-flex flex-column align-center my-10 px-5 px-md-15">
      <h4 class="tutor-hello text-h4 my-5">{{ $t('tutor.hello') }}</h4>
      <p class="tutor-about px-md-15">{{ $t('tutor.about') }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TutorAbout',
});
</script>

<style lang="scss">
#about {
  position: relative;
  .tutor {
    position: absolute;
    top: 0;
    width: 60%;

    &-hello {
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
