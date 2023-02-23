<template>
  <section id="tutorQuestion" class="tutor-question mb-10">
    <h3 class="tutor-question-header mb-5">
      {{ $t('tutor.question.header') }}
    </h3>
    <v-form
      id="questionForm"
      ref="question-form"
      v-model="isFormValid"
      class="d-flex flex-column pr-md-10 pr-lg-15"
      lazy-validation
    >
      <div class="d-flex">
        <v-text-field
          v-model="name"
          class="question-input pr-2 pr-md-5"
          :rules="nameRules"
          :label="$t('user.name')"
          required
          outlined
          :height="65"
          background-color="#FFFFCC"
        ></v-text-field>

        <v-text-field
          v-model="email"
          class="question-input pl-2 pl-md-5"
          :rules="emailRules"
          :label="$t('user.email')"
          required
          outlined
          :height="65"
          background-color="#FFFFCC"
        ></v-text-field>
      </div>

      <v-textarea
        v-model="message"
        class="question-input"
        :rules="messageRules"
        outlined
        background-color="#FFFFCC"
        :label="$t('tutor.question.message')"
      ></v-textarea>

      <div class="d-flex justify-end">
        <v-btn class="btn-md" @click="validate">
          {{ $t('action.send') }}
        </v-btn>
      </div>
    </v-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { VFormRef } from '@/types/vuetify';
import validator from '@/utils/validator';

export default Vue.extend({
  name: 'TutorQuestion',

  data() {
    const minNameLength = validator.getMinNameLength();
    const nameRules = validator.getRules({
      required: this.$t('error.required', { title: this.$t('user.name') }),
      len: this.$t('error.lenMin', {
        title: this.$t('user.name'),
        len: minNameLength,
      }),
    });
    const emailRules = validator.getRules({
      required: this.$t('error.required', {
        title: this.$t('user.email'),
      }),
      emailValid: this.$t('error.valid', { title: this.$t('user.email') }),
    });
    const messageRules = validator.getRules({
      required: this.$t('error.required', {
        title: this.$t('tutor.question.message'),
      }),
    });

    return {
      isFormValid: true,
      name: '',
      email: '',
      message: '',
      nameRules,
      emailRules,
      messageRules,
    };
  },

  methods: {
    validate() {
      (this.$refs['question-form'] as VFormRef).validate();
    },
  },
});
</script>

<style lang="scss">
$question-input-border-color: #0084bc80;

@mixin input-text {
  color: $main-text-color !important;
}

.tutor-question {
  &-header {
    color: $main-text-color;
    font-style: italic;
    font-weight: 500;
    font-size: 2.7em;
  }
}

.question {
  &-input {
    border-radius: 20px;
    border-color: $question-input-border-color;
    border-width: 0.5px;

    & input {
      @include input-text;
    }

    & fieldset {
      border-color: $question-input-border-color;
      border-width: 0.5px;
    }

    & label {
      color: $question-input-border-color !important;
    }

    & textarea {
      @include input-text;
    }
  }
}
</style>
