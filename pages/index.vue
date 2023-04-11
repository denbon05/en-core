<template>
  <v-container class="pa-0" fluid>
    <v-row id="intro" justify="center" align="center">
      <v-col cols="12" class="px-0 pt-0">
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
    <!-- TODO change card view on sm and down -->
    <v-row justify="center" align="start" class="px-5">
      <v-col
        cols="11"
        md="8"
        lg="5"
        class="d-flex justify-center justify-lg-end container-program-card"
      >
        <KidsCard />
      </v-col>
      <v-col
        cols="11"
        md="8"
        lg="5"
        class="d-flex justify-center justify-lg-start container-program-card"
      >
        <BeginnersCard />
      </v-col>
      <v-col
        cols="11"
        md="8"
        lg="5"
        class="d-flex justify-center justify-lg-end container-program-card"
      >
        <AdvancedCard />
      </v-col>
      <v-col
        cols="11"
        md="8"
        lg="5"
        class="d-flex justify-center justify-lg-start container-program-card"
      >
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
      <!-- TODO adjust for sm and down -->
      <v-col cols="11" md="10" lg="9">
        <TutorPlatforms :sm-and-down="smAndDown" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="11" md="10" lg="9">
        <TrialLesson />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="11" md="10" lg="9">
        <TutorQuestion />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  KidsCard,
  BeginnersCard,
  WorkCard,
  AdvancedCard,
  AdvantageCard,
  IntroScreen,
  MainAction,
  TrialLesson,
  TutorAbout,
  TutorIntro,
  TutorPlatforms,
  TutorPrice,
  TutorPrograms,
  TutorQuestion,
} from '@/components/home';
import { getTutorYearExperience } from '@/utils';

// todo: dynamic data from server
const tutorBeginDate = new Date('2019-01-01');

export default Vue.extend({
  name: 'IndexPage',

  // * each card is going to have itself uniq animation
  components: {
    KidsCard,
    BeginnersCard,
    WorkCard,
    AdvancedCard,
    AdvantageCard,
    IntroScreen,
    MainAction,
    TrialLesson,
    TutorAbout,
    TutorIntro,
    TutorPlatforms,
    TutorPrice,
    TutorPrograms,
    TutorQuestion,
  },

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
      return Boolean(this.$vuetify.breakpoint?.smAndDown);
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

.container-program-card {
  margin: 5px;
}

.program {
  position: relative;

  &-card {
    padding: 20px 30px;
    display: flex;
    flex-direction: column;

    &-content {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }

    &-bg {
      object-fit: contain;
    }

    &-title {
      color: $main-title;
      font-family: Kalam, sans-serif;
      font-weight: bold;
      font-size: 5em;
    }

    &-description {
      color: $main-text-color;
      font-family: Inter, sans-serif;
      font-weight: 500;
      font-size: 1.2em;
    }
  }
}
</style>
