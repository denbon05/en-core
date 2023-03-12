<template>
  <section id="calendarSettings" class="d-flex justify-space-between">
    <AppCalendarSettings />
    <GCalendarSettings />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import AppCalendarSettings from './AppCalendarSettings.vue';
import GCalendarSettings from './GCalendarSettings.vue';
// import { ApiResponse } from '@/types/api';

export default Vue.extend({
  name: 'CalendarSettings',

  components: {
    AppCalendarSettings,
    GCalendarSettings,
  },
});
</script>
