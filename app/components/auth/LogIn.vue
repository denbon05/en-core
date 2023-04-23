<template>
  <section id="logIn">
    <v-card class="pa-10">
      <v-form ref="form" v-model="form.isValid" lazy-validation>
        <v-text-field
          ref="email"
          v-model="form.email"
          :label="$t('user.email')"
          required
          @keyup.enter="logIn"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          :label="$t('user.password')"
          :append-icon="form.isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          :type="form.isPasswordVisible ? 'text' : 'password'"
          required
          @click:append="togglePasswordVisibility"
          @keyup.enter="logIn"
        ></v-text-field>

        <v-btn :disabled="form.isLoading" dark class="mt-4" @click="logIn">
          {{ $t('action.logIn') }}
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
  name: 'LogIn',

  inject: ['showSnackbar'],

  data: () => ({
    isConfirmDialogVisible: false,
    form: {
      email: '',
      password: '',
      isPasswordVisible: false,
      isLoading: false,
      isValid: true,
    },
    loginQuery: {
      isLoading: false,
      isSuccess: false,
      message: '',
    },
  }),

  watch: {
    loginQuery: {
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
      (this.$refs!.email as HTMLInputElement).focus();
    });
  },

  methods: {
    async logIn() {
      this.loginQuery.isLoading = true;
      (this.$refs!.form as VFormRef).validate();

      if (!this.form.isValid) {
        return;
      }

      const { email, password } = this.form;

      try {
        const { isSuccess, message } = await this.$store.dispatch(
          'auth/logIn',
          {
            email,
            password,
          }
        );

        this.loginQuery = { ...this.loginQuery, isSuccess, message };

        if (isSuccess) {
          this.$router.push('/profile');
        }
      } catch (err) {
        this.$logger.error(err);
        // TODO handle err
      }
      this.loginQuery.isLoading = false;
    },

    togglePasswordVisibility(): void {
      this.form.isPasswordVisible = !this.form.isPasswordVisible;
    },
  },
});
</script>
