<template>
  <div class="survey">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="survey-content">
      <page-header title="명상 설문 관리" @open-drawer="openDrawer" />
      <div class="survey-card-container">
        <survey-card
          v-for="(survey, i) in surveys"
          :title="survey.surveyTitle"
          :index="survey.surveyTitleNo"
          :key="i"
          @update="update"
        />
      </div>
    </div>
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';
import pageHeader from '../components/PageHeader.vue';
import SurveyCard from '../components/SurveyCard.vue';
import { getSurveys } from '../lib/survey';

export default {
  name: 'survey',
  components: { navigationDrawer, pageHeader, SurveyCard },
  data() {
    return {
      isDrawerOpened: false,
      surveys: [],
    };
  },
  methods: {
    openDrawer() {
      this.isDrawerOpened = true;
    },
    closeDrawer() {
      this.isDrawerOpened = false;
    },
    async getSurveysData() {
      try {
        const response = await getSurveys();
        this.surveys = response.data.data;
      } catch (e) {
        // eslint-disable-next-line
        alert('설문조사 리스트 조회를 실패했습니다.');
        // eslint-disable-next-line
        console.log(e);
      }
    },
    update() {
      this.getSurveysData();
    },
  },
  mounted() {
    this.update();
  },
};
</script>

<style scoped>
.survey {
  height: 100vh;
  background: linear-gradient(#a7c4cd, #b4a0bd);
}

.survey-card-container {
  display: grid;
  grid-gap: 1em;
  padding: 0 1em;
}
</style>
