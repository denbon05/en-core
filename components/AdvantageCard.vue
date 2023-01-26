<template>
  <section class="d-flex justify-center">
    <div class="d-flex flex-column align-center">
      <img :src="imgSrc" :alt="description" />
      <p class="text-h6 py-5 description-card">{{ description }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AdvantageCard',

  props: {
    imgSrc: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
  },
});
</script>

<style lang="scss">
.description-card {
  color: $main-text-color;
  font-weight: 400;
}
</style>
