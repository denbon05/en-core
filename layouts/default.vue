<template>
  <v-app id="appRoot">
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
          class="d-flex align-center flex-basis-half justify-end mr-md-15 mr-5"
        >
          <!-- todo: use v-btn 'to' -->
          <a
            v-for="name of menuItemNames"
            :key="name"
            class="menu-item text-uppercase text-decoration-none white--text pr-5 pr-md-15"
            href="#"
            >{{ name }}</a
          >
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <Nuxt />
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
$menu-item-font-size: 1.4em;

#appRoot {
  background-color: $app-bg-color-root;
}

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
