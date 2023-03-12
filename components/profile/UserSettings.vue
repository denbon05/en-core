<template>
  <section id="userSettings" class="d-flex justify-space-between">
    <v-card elevation="5" shaped class="w-90 pa-4" color="fade">
      <v-tabs
        v-model="tab"
        grow
        align-with-title
        background-color="fade"
        slider-color="fade"
      >
        <v-tabs-slider color="blue"></v-tabs-slider>
        <v-tab
          v-for="key in settings"
          :key="key"
          :to="`#${key}`"
          nuxt
          class="h-100"
        >
          {{ $t(`user.settings.${key}`) }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="h-90" :class="tabItemsClasses">
        <v-tab-item
          v-for="(component, idx) in components"
          :id="settings[idx]"
          :key="`setting-tab-${idx}`"
        >
          <component :is="component" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-btn fab plain class="flex-shrink-1">
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
import CalendarSettings from './calendar/CalendarSettings.vue';
import DataSettings from './DataSettings.vue';
import { ApiResponse } from '@/types/api';

export default Vue.extend({
  name: 'UserSettings',

  data() {
    return {
      settings: ['calendar', 'data'],
      tab: null,
      components: [CalendarSettings, DataSettings],
    };
  },

  computed: {
    tabItemsClasses(): string {
      const isThemeDark: boolean = this.$vuetify.theme.isDark;
      // the same as in nuxt.config.js
      return isThemeDark ? 'grey lighten-1' : 'grey lighten-5';
    },
  },

  beforeMount() {
    this.fetchUserConfig();
  },

  methods: {
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
  height: 500px;
}

#logOutIcon {
  // transition: width 0.2s;

  // &:hover {
  //   cursor: pointer;
  //   width: 51.5px;
  // }
}
</style>
