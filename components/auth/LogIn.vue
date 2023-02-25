<template>
  <v-card elevation="5" class="pa-10" shaped>
    <v-form ref="form" v-model="form.isValid" lazy-validation>
      <v-text-field
        v-model="form.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.password"
        :rules="passwordRules"
        label="Password"
        :append-icon="form.isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
        :type="form.isPasswordVisible ? 'text' : 'password'"
        required
        @click:append="togglePasswordVisibility"
      ></v-text-field>

      <v-btn :disabled="form.isLoading" dark class="mt-4" @click="logIn">
        Log In
      </v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
// import validator from '@/utils/validator';
// TODO implement validator
// TODO submit on enter key

export default Vue.extend({
  name: 'LogIn',

  data: () => ({
    form: {
      email: '',
      password: '',
      isPasswordVisible: false,
      isLoading: false,
      isValid: true,
    },
    emailRules: [
      // (v) => !!v || 'E-mail is required',
      // (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      // (v) => allowedEmails.has(v) || 'E-mail is not allowed',
    ],
    passwordRules: [(v: string) => !!v || 'Password is required'],
  }),

  methods: {
    async logIn() {
      this.form.isLoading = true;
      await this.$refs.form.validate();

      if (!this.form.isValid) {
        return;
      }

      const { email, password } = this.form;

      try {
        const { isSuccess } = await this.$api('auth/login/', {
          email,
          password,
        });

        console.log('login', { isSuccess });
        if (isSuccess) {
          await this.$api('google/auth/login');
          // this.$router.push('/');
          return;
        }

        console.warn("TODO case $api('auth/login/");
      } catch (err) {
        console.error(err);
        // TODO handle err
      }
      this.form.isLoading = false;
    },

    togglePasswordVisibility(): void {
      this.form.isPasswordVisible = !this.form.isPasswordVisible;
    },
  },
});
</script>
