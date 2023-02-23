<template>
  <v-container>
    <v-row justify="center" align="start" class="py-15">
      <v-col md="10" lg="8">
        <log-in />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import LogIn from '@/components/auth/LogIn.vue';

export default Vue.extend({
  components: {
    LogIn,
  },
});
</script>
