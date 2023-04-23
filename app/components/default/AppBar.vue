<template>
  <v-app-bar id="appBar" fixed app>
    <div class="d-flex justify-center align-center justify-space-between w-100">
      <div class="d-flex flex-basis-50 mt-3">
        <div class="flex-basis-half d-flex justify-center align-center">
          <v-btn fab plain href="/">
            <v-img
              src="/logo_white.svg"
              alt="'EN' on the Moon"
              :height="50"
              :width="50"
              contain
            ></v-img>
          </v-btn>
        </div>
      </div>

      <div
        id="appNavMenu"
        class="d-flex align-center flex-basis-half justify-end mt-3 mr-md-15 mr-0"
      >
        <v-btn
          v-for="{ name, key } of menuItems"
          :key="key"
          text
          plain
          class="menu-item white--text pr-2 pr-sm-5 pr-lg-10"
          :to="`#${key}`"
        >
          {{ name }}
        </v-btn>

        <v-btn id="profileIcon" href="/profile" fab plain>
          <img src="/icons8-male-user-50.png" alt="Profile icon" />
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppBar',

  props: {
    menuItems: {
      required: true,
      type: Array<{
        name: string;
        key: string;
      }>,
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

#profileIcon {
  -webkit-filter: invert(1);
  filter: invert(1);
}
</style>
