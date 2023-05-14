<template>
  <section id="worksCard" class="program">
    <img
      class="program-card-bg"
      src="/work_card_bg.svg"
      alt="A queen and a pawn on a chessboard"
    />

    <div class="program-card-content program-card align-end justify-end">
      <h4 class="program-card-title">{{ $t('program.work.title') }}</h4>
      <div class="work-card-description pl-12 pa-sm-5">
        <p class="program-card-description">
          {{ $t('program.work.description') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'WorksCard',
});
</script>

<style lang="scss">
.work-card-description {
  width: 60%;
}
</style>
