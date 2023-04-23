<template>
  <section id="signUp">
    <v-card class="pa-10">
      <v-form
        ref="form"
        v-model="form.isValid"
        lazy-validation
        @keyup.enter="signUp"
      >
        <v-text-field
          ref="email"
          v-model="form.email"
          :rules="emailRules"
          :label="$t('user.email')"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.firstName"
          :rules="emailRules"
          :label="$t('user.firstName')"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.lastName"
          :rules="emailRules"
          :label="$t('user.lastName')"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          :rules="passwordRules"
          :label="$t('user.password')"
          :append-icon="passwordIcon"
          :type="passwordType"
          required
          @click:append="togglePasswordVisibility"
        ></v-text-field>

        <v-text-field
          v-model="form.passwordRepeated"
          :rules="passwordRepeatedRules"
          :label="$t('user.passwordRepeat')"
          :append-icon="passwordIcon"
          :type="passwordType"
          required
          @click:append="togglePasswordVisibility"
        ></v-text-field>

        <v-btn :disabled="form.isLoading" dark class="mt-4" @click="signUp">
          {{ $t('action.signUp') }}
        </v-btn>
      </v-form>
    </v-card>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { ComponentQuery, VFormRef } from '@/types/vue-specified';
// import validator from '@/utils/validator';
// TODO implement validator
// TODO submit on enter key

export default Vue.extend({
  name: 'SignUp',

  inject: ['showSnackbar'],

  data() {
    return {
      isConfirmDialogVisible: false,
      form: {
        email: '',
        password: '',
        passwordRepeated: '',
        firstName: '',
        lastName: '',
        isPasswordVisible: false,
        isLoading: false,
        isValid: true,
      },
      signupQuery: {
        isLoading: false,
        isSuccess: false,
        message: '',
      },
      emailRules: [
        // (v) => !!v || 'E-mail is required',
        // (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        // (v) => allowedEmails.has(v) || 'E-mail is not allowed',
      ],
      passwordRules: [(v: string) => !!v || 'Password is required'],
      passwordRepeatedRules: [
        (v: string) => v === this.form.password || 'Passwords should be equal',
      ],
    };
  },

  computed: {
    passwordIcon() {
      return this.form.isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off';
    },

    passwordType() {
      return this.form.isPasswordVisible ? 'text' : 'password';
    },
  },

  watch: {
    signupQuery: {
      deep: true,
      handler({ isLoading, isSuccess, message }: ComponentQuery) {
        if (!isLoading && !isSuccess) {
          this.showSnackbar({ isSuccess, message });
        }
      },
    },
  },

  mounted() {
    this.$nextTick(() => {
      (this.$refs.email as HTMLInputElement).focus();
    });
  },

  methods: {
    async signUp() {
      this.signupQuery.isLoading = true;
      (this.$refs.form as VFormRef).validate();

      if (!this.form.isValid) {
        return;
      }

      const { email, password, firstName, lastName } = this.form;

      try {
        const { isSuccess, message } = await this.$store.dispatch(
          'auth/signUp',
          { email, password, firstName, lastName }
        );

        this.signupQuery = { ...this.signupQuery, isSuccess, message };

        if (isSuccess) {
          this.$router.push('/profile');
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        // TODO handle err
      }
      this.signupQuery.isLoading = false;
    },

    togglePasswordVisibility(): void {
      this.form.isPasswordVisible = !this.form.isPasswordVisible;
    },
  },
});
</script>
