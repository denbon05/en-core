<template>
  <section id="mainAction" class="d-flex justify-center">
    <v-btn elevation="2" x-large class="px-8 py-10 btn-big">{{
      $t('action.book')
    }}</v-btn>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MainAction',
});
</script>

<style lang="scss">
#mainAction {
  margin: $app-bar-height $app-bar-height;

  .btn-big {
    font-family: Inter, sans-serif !important;
    font-size: 1.5rem;
    font-weight: 600;
    border-radius: $btn-radius;
  }
}
</style>
