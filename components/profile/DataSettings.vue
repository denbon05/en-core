<template>
  <section id="dataSettings" class="d-flex justify-center">
    <v-form
      ref="userDataForm"
      v-model="isFormValid"
      :readonly="query.isLoading"
      class="w-70"
      lazy-validation
    >
      <v-text-field
        v-model="firstName"
        :label="$t('user.firstName')"
        :rules="required"
        required
      ></v-text-field>

      <v-text-field
        v-model="lastName"
        :label="$t('user.lastName')"
        :rules="required"
        required
      ></v-text-field>

      <v-text-field
        v-if="roleName"
        v-model="roleName"
        :label="$t('user.roleName')"
        disabled
      ></v-text-field>

      <v-text-field
        v-model="email"
        :label="$t('user.email')"
        disabled
      ></v-text-field>

      <v-btn color="primary" class="mt-4 pa-5" @click="save">
        {{ $t('action.save') }}
      </v-btn>
    </v-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { ComponentQuery } from '@/types/vue-specified';

export default Vue.extend({
  name: 'DataSettings',

  inject: ['showSnackbar'],

  data() {
    const { email, firstName, lastName, roleName } =
      this.$store.getters['user/data'];
    return {
      isFormValid: true,
      email,
      firstName,
      lastName,
      roleName,
      required: [(v: string) => !!v || 'Required'],
      query: {
        isLoading: false,
        isSuccess: true,
        message: null,
      },
    };
  },

  watch: {
    query: {
      deep: true,
      handler({ isLoading, isSuccess, message }: ComponentQuery) {
        if (!isLoading) {
          this.showSnackbar({ isLoading, isSuccess, message });
        }
      },
    },
  },

  methods: {
    async save() {
      await this.$refs.userDataForm.validate();

      if (!this.isFormValid) {
        return;
      }

      this.query.isLoading = true;
      const { firstName, lastName } = this;
      const { isSuccess, message = this.$t('notification.success') } =
        await this.$store.dispatch('user/updateData', { firstName, lastName });
      this.query = {
        isLoading: false,
        isSuccess,
        message,
      };
    },
  },
});
</script>
