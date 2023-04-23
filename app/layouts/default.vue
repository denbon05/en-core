<template>
  <v-app id="appRoot">
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar.isVisible" :color="snackbar.color" right>
        {{ snackbar.message }}
      </v-snackbar>
    </div>

    <AppBar :menu-items="menuItems" />

    <v-main>
      <Nuxt />
    </v-main>

    <AppFooter :menu-items="menuItems" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/default/AppBar.vue';
import AppFooter from '@/components/default/AppFooter.vue';
import { ShowSnackbarParam } from '@/types/global/vue';
import { MenuItem } from '@/types/components/default';

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
      snackbar: {
        isVisible: false,
        message: '',
        color: 'red',
      },
    };
  },

  computed: {
    menuItems(): MenuItem[] {
      const idKeys = ['about', 'contact', 'programs'];
      const items = idKeys.map((key: string) => ({
        name: this.$t(`menu.${key}.title`),
        key,
      }));
      return items;
    },
  },

  methods: {
    showSnackbar({ message, isSuccess, isWarn = false }: ShowSnackbarParam) {
      const color = isWarn
        ? 'lime darken-2'
        : isSuccess
        ? 'light-green darken-1'
        : 'red darken-2';

      this.$set(this, 'snackbar', {
        isVisible: true,
        message: message ?? this.$t('error.common'),
        color,
      });
    },
  },
});
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

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
