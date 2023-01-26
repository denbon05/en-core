<template>
  <section id="programs">
    <img
      id="programsBG"
      src="/tutor_wave.svg"
      alt="Wave rectangle with arrow to the programs"
    />

    <div is="programsDescription"></div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TutorPrograms',
});
</script>

<style lang="scss">
#programs {
  position: relative;

  #programsDescription {
    position: absolute;
    top: 0;
  }
}
</style>
