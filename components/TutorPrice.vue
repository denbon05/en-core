<template>
  <section id="tutorPrice" class="d-flex justify-center my-10">
    <h2 id="timePrice">{{ $t('tutor.price', { price, minutes }) }}</h2>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TutorPrice',

  data() {
    return {
      price: 4,
      minutes: 50,
    };
  },
});
</script>

<style lang="scss">
#timePrice {
  color: $main-text-color;
  font-family: Inter, sans-serif;
  font-style: italic;
  font-weight: 500;
  font-size: 3rem;
}
</style>
