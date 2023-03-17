<template>
  <v-container id="profile">
    <v-row justify="center">
      <v-col
        ><h1 class="h2 text-center">{{ $t('page.profile') }}</h1></v-col
      >
    </v-row>
    <v-row justify="center" class="pb-15">
      <v-col md="10" xl="8">
        <user-settings />
      </v-col>
    </v-row>

    <v-btn id="logOutBtn" fab plain class="flex-shrink-1" @click="logOut">
      <img src="/icons8-log-out-64.png" alt="Log Out icon" width="50" />
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import UserSettings from '@/components/profile/UserSettings.vue';

export default Vue.extend({
  name: 'UserProfile',

  components: {
    UserSettings,
  },

  middleware: ['authenticated'],

  methods: {
    logOut() {
      console.log('LOGOUT');
      this.$store.dispatch('auth/logOut');
      this.$router.push('/auth');
    },
  },
});
</script>

<style lang="scss">
#profile {
  position: relative;
}

#logOutBtn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
