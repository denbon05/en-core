<template>
  <section id="mainAction" class="d-flex justify-center">
    <v-btn elevation="2" class="btn-lg">{{ $tc('action.book.lesson') }}</v-btn>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MainAction',
  // todo book lesson logic
});
</script>

<style lang="scss">
#mainAction {
  margin: $app-bar-height $app-bar-height;
}
</style>
