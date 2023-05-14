<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :name="$attrs.label"
    :rules="rules"
  >
    <v-textarea
      v-model="innerValue"
      :error-messages="errors"
      :success="valid"
      v-bind="$attrs"
      v-on="$listeners"
    ></v-textarea>
  </ValidationProvider>
</template>

<script lang="ts">
import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', required);

export default Vue.extend({
  name: 'VTextAreaWithValidation',

  components: {
    ValidationProvider,
  },

  props: {
    rules: {
      type: [Array, String],
      required: true,
    },
    // must be included in props
    value: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    innerValue: '',
  }),

  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
});
</script>
