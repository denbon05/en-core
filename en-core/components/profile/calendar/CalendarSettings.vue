<template>
  <section id="calendarSettings">
    <GCalendarSettings />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import GCalendarSettings from './GCalendarSettings.vue';
// import { ApiResponse } from '@/types/api';

export default Vue.extend({
  name: 'CalendarSettings',

  components: {
    GCalendarSettings,
  },
});
</script>
