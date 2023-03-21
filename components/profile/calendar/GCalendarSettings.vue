<template>
  <section id="GCalendarSettings" class="d-flex">
    <div
      v-if="calendarListShouldBeVisible"
      class="d-flex flex-shrink-1 flex-column"
    >
      <v-list-item-group v-model="calendarListSelected" multiple>
        <v-list-item
          :key="id"
          v-for="{ summary, id } in calendarList"
          :value="id"
          active-class="text--accent-4"
        >
          <template #default="{ active }">
            <v-list-item-content>
              <v-list-item-title v-text="summary"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list-item-group>
      <div class="mt-5 ml-3 flex-shrink-1">
        <v-btn
          :disabled="query.isLoading"
          color="primary"
          elevation="2"
          @click="syncSelected"
          >{{ $t('action.sync') }}</v-btn
        >
      </div>
    </div>

    <div v-else>
      <v-btn
        :disabled="query.isLoading"
        color="primary"
        elevation="2"
        @click="syncGoogleCalendar"
        >{{ $t('action.syncGoogle') }}</v-btn
      >
    </div>
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
      gStatus: {
        isCalendarSynced: false,
        isAuthenticated: false,
      },
      calendarListSelected: [],
      calendarList: [] as Awaited<ApiResponse<'google/calendar/list'>>['list'],
      query: {
        isLoading: false,
        isSuccess: true,
        message: '',
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
    await this.actualizeGStatus();
    if (this.calendarListShouldBeVisible) {
      await this.fetchCalendarList();
    }
  },

  computed: {
    calendarListShouldBeVisible(): boolean {
      return this.gStatus.isAuthenticated;
    },
  },

  methods: {
    async syncSelected() {
      if (!this.calendarListSelected.length) {
        this.showSnackbar({
          message: this.$tc('error.google.calendar.sync', 0),
        });
        return;
      }

      this.query.isLoading = true;
      try {
        const { isSuccess, message = '' } = await this.$api(
          'google/calendar/sync',
          {
            calendarIds: this.calendarListSelected,
          }
        );
        this.query = {
          isLoading: false,
          isSuccess,
          message,
        };
      } catch (err) {
        console.error('syncSelected err', err);
        this.query = {
          isLoading: false,
          isSuccess: false,
          message: this.$tc(
            'error.google.calendar.sync',
            this.calendarListSelected.length
          ),
        };
      }
    },

    async authToGoogle() {
      this.query.isLoading = true;
      try {
        await this.$api('google/auth/login');
        this.query = {
          isLoading: false,
          isSuccess: true,
          message: '',
        };
      } catch (err) {
        console.error(err);
        this.query = {
          isLoading: false,
          isSuccess: false,
          message: this.$t('error.google.auth') as string,
        };
      }
    },

    async fetchCalendarList() {
      this.query.isLoading = true;
      try {
        const {
          isSuccess,
          message,
          list,
        }: Awaited<ApiResponse<'google/calendar/list'>> = await this.$api(
          'google/calendar/list'
        );
        this.calendarList = list;
        this.query = {
          isLoading: false,
          isSuccess,
          message,
        };
      } catch (err) {
        console.error(err);
        this.query = {
          isLoading: false,
          isSuccess: false,
          message: this.$t('error.google.calendar.list') as string,
        };
      }
    },

    async actualizeGStatus(): Promise<void> {
      this.query.isLoading = true;
      try {
        const { isSuccess, status, message } = await this.$api(
          'google/auth/status'
        );
        this.gStatus = status;
        this.query = {
          isSuccess,
          isLoading: false,
          message,
        };
      } catch (err) {
        console.error(err);
        this.query.isLoading = false;
      }
    },

    async syncGoogleCalendar() {
      if (!this.gStatus.isAuthenticated) {
        // auth to google
        await this.authToGoogle();
      }
      await this.actualizeGStatus();
      await this.fetchCalendarList();
    },
  },
});
</script>
