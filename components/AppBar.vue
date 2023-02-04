<template>
  <v-app-bar id="appBar" fixed app>
    <div class="d-flex justify-center align-center justify-space-between w-100">
      <div class="d-flex flex-basis-50 mt-3">
        <div class="flex-basis-half d-flex justify-center align-center">
          <v-img
            src="/logo_white.svg"
            alt="'EN' on the Moon"
            :height="50"
            :width="50"
            contain
          ></v-img>
        </div>
      </div>

      <div
        id="appNavMenu"
        class="d-flex align-center flex-basis-half justify-end mt-3 mr-md-15 mr-0"
      >
        <!-- todo: use v-btn 'to' -->
        <a
          v-for="name of menuItemNames"
          :key="name"
          class="menu-item text-uppercase text-decoration-none white--text pr-2 pr-sm-5 pr-lg-10"
          href="#"
          >{{ name }}</a
        >
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppBar',

  props: {
    menuItemNames: {
      required: true,
      type: Array<string>,
    },
  },
});
</script>

<style lang="scss">
#appBar {
  background-color: $app-bar-color;
  height: $app-bar-height !important;
}

.menu-item {
  font-size: $menu-item-font-size;
}
</style>
