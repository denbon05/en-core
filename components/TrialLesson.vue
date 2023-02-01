<template>
  <section id="trialLesson">
    <v-card class="pa-10" rounded="xl" color="#0084BC">
      <div class="d-flex pa-5 justify-lg-space-between">
        <h5 id="trial-description" class="text-center trial-column">
          {{ $t('lesson.trial.description') }}
        </h5>
        <div
          class="d-flex flex-column align-center justify-start trial-column px-md-5 px-lg-10"
        >
          <v-text-field
            class="trial-input"
            :label="$t('user.email')"
            :placeholder="$t('user.email')"
            outlined
            rounded
            hide-details
            flat
            color="white"
          ></v-text-field>
          <v-text-field
            class="trial-input"
            :label="$t('user.name')"
            :placeholder="$t('user.name')"
            outlined
            rounded
            hide-details
            flat
            color="white"
          ></v-text-field>
          <div class="d-flex justify-end w-100">
            <v-btn class="px-15 py-7 btn-signup" x-large>{{
              $t('action.signUp')
            }}</v-btn>
          </div>
        </div>
      </div>
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
#trial-description {
  font-family: Inter, sans-serif;
  font-size: 3em;
  font-style: normal;
  padding-top: 80px;
}

.trial-column {
  flex-basis: 45%;
}

.trial-input {
  width: 90%;
}

.btn-signup {
  font-size: 1.4em;
  font-weight: bold;
  border-radius: 20px;
}
</style>
