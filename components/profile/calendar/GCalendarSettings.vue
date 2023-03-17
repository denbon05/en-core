<template>
  <section id="gCalendarSettings" class="d-flex justify-space-between">
    <template v-if="isCalendarSynced">
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

  inject: ['showSnackbar'],

  data() {
    return {
      isCalendarSynced: false,
      calendarList: [],
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
      handler({ isLoading, isSuccess, message }) {
        if (!isSuccess && !isLoading) {
          this.showSnackbar({ isSuccess, message });
        }
      },
    },
  },

  async beforeMount() {
    const isSynced = await this.fetchGCalendarStatus();
    this.isCalendarSynced = isSynced;
  },

  methods: {
    async authToGoogle() {
      await this.$api('google/auth/login');
    },

    async fetchCalendarList() {
      const res: Awaited<ApiResponse<'google/calendar/list'>> = await this.$api(
        'google/calendar/list'
      );
      console.log('fetchCalendarList', { res });
    },

    async fetchGCalendarStatus(): Promise<boolean> {
      this.query.isLoading = true;
      try {
        const {
          isSuccess,
          isSynced,
          message,
        }: Awaited<ApiResponse<'google/calendar/data'>> = await this.$api(
          'google/calendar/data'
        );
        this.query = {
          isSuccess,
          isLoading: false,
          message,
        };
        return isSynced;
      } catch (err) {
        console.error(err);
        this.query.isLoading = false;
        return false;
      }
    },

    async syncGoogleCalendar() {
      await this.authToGoogle();
      await this.fetchCalendarList();
    },
  },
});
</script>
