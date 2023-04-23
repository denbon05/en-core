<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :name="$attrs.label"
    :rules="rules"
  >
    <v-text-field
      v-model.lazy="innerValue"
      :error-messages="errors"
      :success="valid"
      v-bind="$attrs"
      v-on="$listeners"
    ></v-text-field>
  </ValidationProvider>
</template>

<script lang="ts">
import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

// setInteractionMode('debounce', ({ errors }) => {
//   if (errors.length) {
//     return {
//       on: ['input'],
//       debounce: 200,
//     };
//   }

//   return {
//     on: ['change'],
//     debounce: 0,
//   };
// });

extend('required', required);
extend('email', email);

export default Vue.extend({
  name: 'VTextFieldWithValidation',

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
