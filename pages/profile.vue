<template>
  <v-container id="profile">
    <v-row justify="center" class="py-15">
      <v-col md="10" xl="8">
        <user-settings />
      </v-col>
    </v-row>
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
});
</script>
