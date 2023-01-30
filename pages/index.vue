<template>
  <v-container class="pa-0" fluid>
    <v-row id="intro" justify="center" align="center">
      <v-col cols="12" class="px-0">
        <IntroScreen :sm-and-down="smAndDown" />
      </v-col>
    </v-row>
    <v-row
      id="advantages"
      class="ma-5 ma-md-10 my-10 my-md-15"
      justify="center"
      align="start"
    >
      <v-col
        v-for="{ imgSrc, description } of advantages"
        :key="imgSrc"
        class="advantage mx-5"
        cols="4"
        md="3"
      >
        <AdvantageCard :img-src="imgSrc" :description="description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ma-0 pa-0" cols="12">
        <TutorAbout :sm-and-down="smAndDown" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ma-0 pa-0 mt-n2" cols="12">
        <TutorPrograms :sm-and-down="smAndDown" />
      </v-col>
    </v-row>
    <v-row justify="center" align="start">
      <v-col cols="10" md="5" class="d-flex justify-center justify-md-end">
        <KidsCard />
      </v-col>
      <v-col cols="10" md="5" class="d-flex justify-center justify-md-start">
        <BeginnersCard />
      </v-col>
      <v-col cols="10" md="5" class="d-flex justify-center justify-md-end">
        <AdvancedCard />
      </v-col>
      <v-col cols="10" md="5" class="d-flex justify-center justify-md-start">
        <WorkCard />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"><MainAction /></v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" md="10" lg="8">
        <TutorIntro />
      </v-col>
    </v-row>
    <v-row justify="center" align="center"
      ><v-col cols="12"><TutorPrice /></v-col
    ></v-row>
    <v-row justify="center" align="center">
      <v-col cols="10" md="8">
        <TutorPlatforms :sm-and-down="smAndDown" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import KidsCard from '@/components/program-cards/KidsCard.vue';
import BeginnersCard from '@/components/program-cards/BeginnersCard.vue';
import WorkCard from '@/components/program-cards/WorkCard.vue';
import AdvancedCard from '@/components/program-cards/AdvancedCard.vue';
import { getTutorYearExperience } from '@/utils';

// todo: dynamic data from server
const tutorBeginDate = new Date('2019-01-01');

export default Vue.extend({
  name: 'IndexPage',

  // * each card is going to have itself uniq animation
  components: { KidsCard, BeginnersCard, WorkCard, AdvancedCard },

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
#advantages {
  padding-top: 4em;
  padding-bottom: 4em;
}

.advantage {
  width: 30%;
}
</style>
