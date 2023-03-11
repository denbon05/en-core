<template>
  <v-container>
    <v-row justify="center" align="start" class="py-15">
      <v-col md="10" lg="8">
        <v-card elevation="5" shaped>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="blue"></v-tabs-slider>
            <v-tab v-for="action in actions" :key="action">
              {{ action }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="(component, idx) in components"
              :key="`tab-${idx}`"
            >
              <v-card flat>
                <component :is="component" />
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import LogIn from '@/components/auth/LogIn.vue';
import SignUp from '@/components/auth/SignUp.vue';

export default Vue.extend({
  components: {
    LogIn,
  },

  middleware: ['authenticated'],

  data() {
    const actions = ['logIn', 'signUp'].map((key) => this.$t(`action.${key}`));

    return {
      tab: null,
      actions,
      components: [LogIn, SignUp],
    };
  },
});
</script>
