<template>
  <v-app>
    <v-app-bar class="black" :height="appBarMinHeight" fixed>
      <div
        class="d-flex justify-center align-center justify-space-between width-available"
      >
        <div class="d-flex flex-basis-half">
          <v-app-bar-nav-icon class="flex-basis-half">
            <v-img
              src="/logo.png"
              :max-height="logoSize"
              :max-width="logoSize"
              contain
            ></v-img
          ></v-app-bar-nav-icon>
        </div>

        <div
          id="appNavMenu"
          class="d-flex align-center flex-basis-half justify-space-around px-3"
        >
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
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ menuItemNames }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DefaultLayout',

  data() {
    return {
      logoSize: 59,
      appBarMinHeight: 77,
      menuItems: ['about', 'contact', 'programs'],
    };
  },

  computed: {
    menuItemNames() {
      const names = this.menuItems.map((item) => this.$t(`menu.${item}.title`));
      return names as string[];
    },
  },
});
</script>

<style lang="scss">
$menu-item-font: 20px;

.flex-basis-half {
  flex-basis: 50%;
}

.width-available {
  width: 100%;
}

.menu-item {
  font-size: $menu-item-font;
  font-family: 'Kalam-Bold';
}
</style>
