<template>
  <section id="advancedCard" class="program">
    <img class="program-card-bg" src="/advanced_card_bg.svg" alt="Many doors" />

    <div class="program-card-content program-card justify-end align-end">
      <h4 class="program-card-title">{{ $t('program.advanced.title') }}</h4>
      <h4 class="program-card-description text-center pb-5">
        {{ $t('program.advanced.description') }}
      </h4>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AdvancedCard',
});
</script>
