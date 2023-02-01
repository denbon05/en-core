<template>
  <section id="beginnersCard" class="program">
    <img
      class="program-card-bg"
      src="/beginners_card_bg.svg"
      alt="Word 'learning' in the hands"
    />

    <section class="program-card-content program-card justify-end align-center">
      <h4 class="program-card-title mb-5">
        {{ $t('program.beginners.title') }}
      </h4>
      <p class="program-card-description text-center">
        {{ $t('program.beginners.description') }}
      </p>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BeginnersCard',
});
</script>
