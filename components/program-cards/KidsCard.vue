<template>
  <section id="kidsCard" class="program">
    <img
      class="program-card-bg"
      src="/kids_card_bg.svg"
      alt="Letters on the rope"
    />

    <section class="program-card-content program-card justify-space-between">
      <div>
        <h3 class="program-card-title pl-8">{{ $t('program.kids.title') }}</h3>
      </div>

      <div class="d-flex justify-center text-center">
        <p class="program-card-description">
          {{ $t('program.kids.description') }}
        </p>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'KidsCard',
});
</script>
