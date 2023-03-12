<template>
  <section id="userSettings" class="d-flex justify-space-between">
    <template v-if="isGoogleCalendarSynced">
      <v-list-item-group v-model="settings" multiple>
        <v-list-item>
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Hangouts message</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Video sounds</v-list-item-title>
              <v-list-item-subtitle>Hangouts video call</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Invites</v-list-item-title>
              <v-list-item-subtitle
                >Notify when receiving invites</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </template>

    <template v-else>
      <v-btn elevation="2" @click="syncGoogleCalendar">{{
        $t('action.syncGCalendar')
      }}</v-btn>
    </template>

    <v-btn fab plain>
      <img
        id="logOutIcon"
        src="/icons8-log-out-64.png"
        alt="Log Out icon"
        width="50"
        @click="logOut"
      />
    </v-btn>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiResponse } from '@/types/api';

export default Vue.extend({
  data() {
    return {
      settings: [],
    };
  },

  computed: {
    isGoogleCalendarSynced() {
      return this.$store.getters['user/isGoogleCalendarSynced'];
    },
  },

  beforeMount() {
    this.fetchUserConfig();
  },

  methods: {
    async authToGoogle() {
      await this.$api('google/auth/login');
    },

    async syncGoogleCalendar() {
      await this.authToGoogle();
      const res: Awaited<ApiResponse<'google/calendar/list'>> = await this.$api(
        'google/calendar/list'
      );
      console.log('syncGoogleCalendar', { res });
    },

    async fetchUserConfig() {
      const res: Awaited<ApiResponse<'user/config'>> = await this.$api(
        'user/config'
      );
      console.log('u config', res);
    },

    logOut() {
      this.$store.dispatch('auth/logOut');
      this.$router.push('/auth');
    },
  },
});
</script>

<style lang="scss">
#userSettings {
  //
}

#logOutIcon {
  // transition: width 0.2s;

  // &:hover {
  //   cursor: pointer;
  //   width: 51.5px;
  // }
}
</style>
