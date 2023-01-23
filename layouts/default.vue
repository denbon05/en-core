<template>
  <v-app>
    <v-app-bar id="appBar" :height="appBarHeight" fixed app>
      <div
        class="d-flex justify-center align-center justify-space-between width-available"
      >
        <div class="d-flex flex-basis-half">
          <div class="flex-basis-half d-flex justify-center align-center">
            <v-img
              src="/logo.svg"
              :height="logoSize"
              :width="logoSize"
              contain
            ></v-img>
          </div>
        </div>

        <div
          id="appNavMenu"
          class="d-flex align-center flex-basis-half justify-space-around px-md-10"
        >
          <!-- todo: use v-btn 'to' -->
          <a
            v-for="name of menuItemNames"
            :key="name"
            class="menu-item text-uppercase text-decoration-none white--text"
            href="#"
            >{{ name }}</a
          >
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <v-container class="pa-0" fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer>
      <span>&copy; Info</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

const appBarHeight = 77;

export default Vue.extend({
  name: 'DefaultLayout',

  provide: (): { appBarHeight: number } => {
    return {
      appBarHeight,
    };
  },

  data() {
    return {
      logoSize: 59,
      appBarHeight,
      menuItems: ['about', 'contact', 'programs'],
    };
  },

  computed: {
    menuItemNames(): string[] {
      const names = this.menuItems.map((item) => this.$t(`menu.${item}.title`));
      return names as string[];
    },
  },
});
</script>

<style lang="scss">
$menu-item-font-size: 20px;

#appBar {
  background-color: $app-bar-color;
}

.flex-basis-half {
  flex-basis: 50%;
}

.width-available {
  width: 100%;
}

.menu-item {
  font-size: $menu-item-font-size;
  font-family: 'Inter-Regular';
}
</style>
