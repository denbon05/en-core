<template>
  <section id="gCalendarSettings" class="d-flex justify-space-between">
    <template v-if="isGoogleCalendarSynced">
      <v-list-item-group v-model="calendarList" multiple>
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
      <v-btn color="primary" elevation="2" @click="syncGoogleCalendar">{{
        $t('action.syncGCalendar')
      }}</v-btn>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiResponse } from '@/types/api';

export default Vue.extend({
  name: 'GCalendarSettings',

  data() {
    return {
      calendarList: [],
    };
  },

  computed: {
    isGoogleCalendarSynced() {
      return this.$store.getters['user/isGoogleCalendarSynced'];
    },
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
  },
});
</script>
