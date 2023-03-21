<template>
  <v-app id="appRoot">
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar.isVisible" :color="snackbar.color" right>
        {{ snackbar.message }}
      </v-snackbar>
    </div>

    <AppBar :menu-item-names="menuItemNames" />

    <v-main>
      <Nuxt />
    </v-main>

    <AppFooter :menu-item-names="menuItemNames" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/default/AppBar.vue';
import AppFooter from '@/components/default/AppFooter.vue';

export default Vue.extend({
  name: 'DefaultLayout',

  components: { AppFooter, AppBar },

  provide() {
    return {
      showSnackbar: this.showSnackbar,
    };
  },

  data() {
    return {
      menuItems: ['about', 'contact', 'programs'],
      snackbar: {
        isVisible: false,
        message: '',
        color: 'red',
      },
    };
  },

  computed: {
    menuItemNames(): string[] {
      const names = this.menuItems.map((item: string) =>
        this.$t(`menu.${item}.title`)
      );
      return names as string[];
    },
  },

  methods: {
    showSnackbar({
      message,
      isSuccess,
    }: {
      message: string;
      isSuccess: boolean;
    }) {
      this.$set(this, 'snackbar', {
        isVisible: true,
        message,
        color: isSuccess ? 'green darken-2' : 'red darken-2',
      });
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
