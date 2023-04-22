<template>
  <section id="trialLesson">
    <BookLessonVue v-model="isBookLessonOpen" lesson-type="TRIAL">
      <template #action> {{ $t('action.book.trial') }} </template>
    </BookLessonVue>
    <v-card id="trialCard" class="pa-10" rounded="xl" color="#0084BC">
      <div class="d-flex pa-5 justify-lg-space-between">
        <h5 id="trialDescription" class="text-center trial-column">
          {{ $t('lesson.trial.description') }}
        </h5>
        <ValidationObserver
          ref="obs"
          v-slot="{ invalid, validated }"
          class="w-50"
        >
          <v-form>
            <div
              class="d-flex flex-column align-center justify-start trial-column px-md-5 px-lg-10"
            >
              <VTextFieldWithValidation
                v-model="email"
                rules="required|email"
                class="trial-input"
                :label="$t('user.email')"
                outlined
                rounded
                flat
                color="white"
              ></VTextFieldWithValidation>
              <VTextFieldWithValidation
                v-model="name"
                class="trial-input"
                :label="$t('user.name')"
                rules="required"
                outlined
                rounded
                flat
                color="white"
              ></VTextFieldWithValidation>
              <div class="d-flex justify-end w-100">
                <v-btn
                  class="btn-md"
                  x-large
                  :disabled="invalid || !validated"
                  @click="openBookLesson"
                  >{{ $t('action.lesson.pickTime') }}</v-btn
                >
              </div>
            </div>
          </v-form>
        </ValidationObserver>
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
import { ValidationObserver } from 'vee-validate';
import Vue from 'vue';
import VTextFieldWithValidation from '../common/inputs/VTextFieldWithValidation.vue';
import BookLessonVue from './lesson/BookLesson.vue';

// ! TODO send an email
export default Vue.extend({
  name: 'TrialLesson',

  components: {
    BookLessonVue,
    ValidationObserver,
    VTextFieldWithValidation,
  },

  data() {
    return {
      isFormValid: true,
      isBookLessonOpen: false,
      email: '',
      name: '',
    };
  },

  methods: {
    openBookLesson() {
      this.isBookLessonOpen = true;
      // reset form
      (this.$refs.obs as any).reset();
    },
  },
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
