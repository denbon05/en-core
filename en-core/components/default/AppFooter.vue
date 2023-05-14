<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <footer id="appFooter" class="d-flex justify-space-around align-center">
    <section class="d-flex flex-column justify-end h-100 w-25 text-uppercase">
      <div
        id="footerMedia"
        class="d-flex flex-column justify-end align-start h-50"
      >
        <v-btn fab plain href="/" class="ml-5 mb-4">
          <img id="footerLogo" src="/logo_black.png" alt="'EN' on the Moon" />
        </v-btn>
        <div id="footerSiteInfo" class="d-flex flex-column mt-15 mt-md-10">
          <h3>{{ $t('main.name') }}</h3>
          <h3>{{ $t('main.description') }}</h3>
        </div>
        <div id="footerMediaIcons" class="d-flex mt-10 ml-n4">
          <img
            v-for="mediaName in mediaNames"
            :key="mediaName"
            :src="`/${mediaName}_icon.png`"
            :alt="mediaName"
            class="px-3"
          />
        </div>
        <a
          class="text--secondary caption pt-5"
          href="https://github.com/denbon05"
          target="_blank"
        >
          © Denys Bondarenko
        </a>
      </div>
    </section>

    <section id="footerInfo" class="d-flex flex-column w-40">
      <img
        id="footerTitle"
        class="pb-5"
        src="/footer_title_mobile.svg"
        alt="'English' highlighted"
      />
      <div class="d-flex flex-column align-center">
        <span>{{ emailRow }}</span>
        <span>{{ phoneRow }}</span>
        <span>{{ additionalRow }}</span>
      </div>
    </section>

    <section
      id="footerMenuItems"
      class="d-flex flex-column justify-md-space-around justify-end align-end h-80 w-25 text-uppercase pt-md-15 pt-lg-0"
    >
      <v-btn
        v-for="{ name, key } of menuItems"
        :key="key"
        text
        plain
        class="subtitle-1"
        :to="`#${key}`"
      >
        {{ name }}
      </v-btn>
    </section>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

// TODO fetch tutor info from server
const tutorEmail = 'ekongichibidesmond@gmail.com';
const tutorPhone = '+237679070662';
const tutorLocation = 'Buea, Southwest Cameroon';

export default Vue.extend({
  name: 'MainFooter',

  props: {
    menuItems: {
      required: true,
      type: Array<{
        name: string;
        key: string;
      }>,
    },
  },

  data() {
    return {
      mediaNames: ['youtube', 'telegram', 'fb'],
    };
  },

  computed: {
    emailRow(): string {
      return `${this.$t('tutor.email')}: ${tutorEmail}`;
    },
    phoneRow(): string {
      return `${this.$t('tutor.phone')}: ${tutorPhone}`;
    },
    additionalRow(): string {
      return tutorLocation;
    },
  },
});
</script>

<style lang="scss">
$footer-logo-size: $footer-logo-size / 1.6;
// todo: define styles up to sm
#appFooter {
  background: url('/footer_wave.png');
  background-size: cover;
  height: 600px;
  width: 100%;
  background-repeat: no-repeat;
  color: $main-text-color;
  padding: 30px;
}

.footer-section {
  height: 70%;
}

#footerLogo {
  height: $footer-logo-size;
  width: $footer-logo-size;
}

#footerSiteInfo {
  font-size: 0.8rem;
}

#footerMediaIcons img {
  width: 50px;
}

#footerInfo {
  font-size: 0.9rem;
}

#footerMenuItems {
  font-size: 1rem;
  font-weight: 600;
}
</style>
