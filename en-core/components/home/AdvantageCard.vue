<template>
  <section class="d-flex justify-center px-5 px-md-15">
    <div class="d-flex flex-column align-center">
      <img class="advantage-img" :src="imgSrc" :alt="description" />
      <p class="py-2 py-md-5 description-card">{{ description }}</p>
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
  font-size: 1em;
  text-align: center;
}

.advantage-img {
  object-fit: contain;
  width: 22vw;
}
</style>
