<template>
  <section id="contact" class="tutor-question mb-10">
    <h3 class="tutor-question-header mb-5">
      {{ $t('tutor.question.header') }}
    </h3>
    <ValidationObserver ref="questionObserver" v-slot="{ invalid, validated }">
      <v-form id="questionForm" class="d-flex flex-column pr-md-10 pr-lg-15">
        <div class="d-flex">
          <VTextFieldWithValidation
            v-model="name"
            class="question-input pr-2 pr-md-5"
            rules="required"
            :label="$t('user.name')"
            outlined
            :height="65"
            background-color="#FFFFCC"
          ></VTextFieldWithValidation>

          <VTextFieldWithValidation
            v-model.lazy="email"
            class="question-input pl-2 pl-md-5"
            rules="required|email"
            :label="$t('user.email')"
            outlined
            :height="65"
            background-color="#FFFFCC"
          ></VTextFieldWithValidation>
        </div>

        <VTextAreaWithValidation
          v-model="message"
          class="question-input"
          rules="required"
          outlined
          background-color="#FFFFCC"
          :label="$t('tutor.question.message')"
        ></VTextAreaWithValidation>

        <div class="d-flex justify-end">
          <v-btn
            class="btn-md"
            :disabled="invalid || !validated || isLoading"
            @click="sendQuestion"
          >
            {{ $t('action.send') }}
          </v-btn>
        </div>
      </v-form>
    </ValidationObserver>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { ValidationObserver } from 'vee-validate';
import VTextFieldWithValidation from '../common/inputs/VTextFieldWithValidation.vue';
import VTextAreaWithValidation from '../common/inputs/VTextAreaWithValidation.vue';

export default Vue.extend({
  name: 'TutorQuestion',

  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VTextAreaWithValidation,
  },

  inject: ['showSnackbar'],

  data() {
    return {
      name: '',
      email: '',
      message: '',
      isLoading: false,
    };
  },

  methods: {
    async sendQuestion() {
      this.isLoading = true;
      const userId = this.$store.getters['user/userId'];
      try {
        const { isSuccess, message: msg } = await this.$api(
          'v1/user/email/send',
          {
            email: this.email,
            name: this.name,
            message: this.message,
            userId,
          }
        );

        const message = isSuccess ? this.$t('success.message.sent') : msg;
        this.showSnackbar({
          isSuccess,
          message,
        });
        if (isSuccess) {
          // reset the form
          this.name = this.email = this.message = '';
          (this.$refs.questionObserver as any).reset();
        }
      } catch (err) {
        this.$logger.error(err);
      } finally {
        this.isLoading = false;
      }
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
