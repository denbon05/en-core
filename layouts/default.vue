<template>
  <v-app id="appRoot">
    <v-app-bar id="appBar" fixed app>
      <div
        class="d-flex justify-center align-center justify-space-between width-available"
      >
        <div class="d-flex flex-basis-half mt-3">
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

export default Vue.extend({
  name: 'DefaultLayout',

  data() {
    return {
      logoSize: 59,
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
#appRoot {
  background-color: $app-bg-color-root;
}

#appBar {
  background-color: $app-bar-color;
  height: $app-bar-height !important;
}

.flex-basis-half {
  flex-basis: 50%;
}

.width-available {
  width: 100%;
}

.menu-item {
  font-size: $menu-item-font-size;
}
</style>
