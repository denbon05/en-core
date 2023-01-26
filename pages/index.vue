<template>
  <v-container class="pa-0" fluid>
    <v-row id="intro" justify="center" align="center">
      <v-col cols="12" class="px-0">
        <IntroScreen />
      </v-col>
    </v-row>
    <v-row id="advantages" justify="center" align="center">
      <v-col
        v-for="{ imgSrc, description } of advantages"
        :key="imgSrc"
        lg="3"
        cols="12"
      >
        <AdvantageCard :img-src="imgSrc" :description="description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ma-0 pa-0" cols="12">
        <TutorAbout />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ma-0 pa-0 mt-n2" cols="12">
        <TutorPrograms />
      </v-col>
    </v-row>
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
  computed: {},
});
</script>

<style lang="scss">
#advantages {
  margin-top: $section-margin;
  margin-bottom: $section-margin;
}
</style>
