<template>
  <section id="trialLesson">
    <v-card id="trialCard" class="pa-10" rounded="xl" color="#0084BC">
      <div class="d-flex pa-5 justify-lg-space-between">
        <h5 id="trialDescription" class="text-center trial-column">
          {{ $t('lesson.trial.description') }}
        </h5>
        <div
          class="d-flex flex-column align-center justify-start trial-column px-md-5 px-lg-10"
        >
          <v-text-field
            class="trial-input pb-5"
            :label="$t('user.email')"
            outlined
            rounded
            hide-details
            flat
            color="white"
          ></v-text-field>
          <v-text-field
            class="trial-input pb-5"
            :label="$t('user.name')"
            outlined
            rounded
            hide-details
            flat
            color="white"
          ></v-text-field>
          <div class="d-flex justify-end w-100">
            <v-btn class="btn-md" x-large>{{ $t('action.signUp') }}</v-btn>
          </div>
        </div>
      </div>
      <img
        id="trialArrow"
        src="/curve_arrow_down.png"
        alt="Curved arrow pointing down"
      />
    </v-card>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TrialLesson',
});
</script>

<style lang="scss">
// TODO define styles up to sm
$arrow-out-size: 100px;
$trial-card-height: 400px;
$trial-card-container-height: $trial-card-height + ($arrow-out-size / 4);

#trialLesson {
  height: $trial-card-container-height;
  margin: 40px 0;
}

#trialCard {
  position: relative;
  max-height: $trial-card-height;
}

#trialArrow {
  position: absolute;
  bottom: -$arrow-out-size;
  margin-left: auto;
  margin-right: auto;
  width: $arrow-out-size;
  left: 0;
  right: 0;
}

#trialDescription {
  font-family: Inter, sans-serif;
  font-size: 1.8rem;
  font-style: normal;
}

.trial-column {
  flex-basis: 45%;
}

.trial-input {
  width: 90%;
}
</style>
