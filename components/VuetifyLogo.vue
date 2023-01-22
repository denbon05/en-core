<template>
  <div>
    <img class="vuetify-logo" alt="Vuetify Logo" src="/vuetify-logo.svg" />
    <h1 @click="ping">{{ $t('lang') }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'VuetifyLogo',

  data: () => ({
    message: 'Hello there!',
  }),

  methods: {
    async ping() {
      const res = await this.$api('ping', 'check', {
        message: 'Client says hi!',
      });
      console.log(res);
    },
  },
});
</script>

<style>
.vuetify-logo {
  height: 180px;
  width: 180px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
