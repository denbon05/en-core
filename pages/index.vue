<template>
  <v-container class="pa-0" fluid>
    <v-row id="intro" justify="center" align="center">
      <v-col cols="12" class="px-0">
        <IntroScreen :sm-and-down="smAndDown" />
      </v-col>
    </v-row>
    <v-row
      id="advantages"
      class="ma-2 ma-md-10 my-lg-15"
      justify="center"
      align="start"
    >
      <v-col
        v-for="{ imgSrc, description } of advantages"
        :key="imgSrc"
        class="advantage"
        cols="4"
      >
        <AdvantageCard :img-src="imgSrc" :description="description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ma-0 pa-0" cols="12">
        <TutorAbout :sm-and-down="smAndDown" />
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col class="ma-0 pa-0 mt-n2" cols="12">
        <TutorPrograms />
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { getTutorYearExperience } from '@/utils';

// todo: dynamic data from server
const tutorBeginDate = new Date('2019-01-01');

export default Vue.extend({
  name: 'IndexPage',

  data() {
    return {
      advantages: [
        {
          imgSrc: '/ellipse_chat.svg',
          description: this.$t('advantage.experience', {
            amount: getTutorYearExperience(tutorBeginDate),
          }),
        },
        {
          imgSrc: '/ellipse_students.svg',
          description: this.$t('advantage.students'),
        },
        {
          imgSrc: '/ellipse_approach.svg',
          description: this.$t('advantage.approach'),
        },
      ],
    };
  },
  computed: {
    smAndDown(): boolean {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
});
</script>

<style lang="scss">
.advantage {
  width: 30%;
}
</style>
