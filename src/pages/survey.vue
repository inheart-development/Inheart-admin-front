<template>
  <div class="survey">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="survey-content">
      <page-header title="명상 설문 관리" @open-drawer="openDrawer" />
      <div class="survey-card-container">
        <survey-card title="12312312" index="1"/>
      </div>
    </div>
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';
import pageHeader from '../components/PageHeader.vue';
import SurveyCard from '../components/SurveyCard.vue';

export default {
  name: 'survey',
  components: { navigationDrawer, pageHeader, SurveyCard },
  data() {
    return {
      isDrawerOpened: false,
    };
  },
  methods: {
    openDrawer() {
      this.isDrawerOpened = true;
    },
    closeDrawer() {
      this.isDrawerOpened = false;
    },
  },
};
</script>

<style scoped>
.survey {
  height: 100vh;
  background: linear-gradient(#a7c4cd, #b4a0bd);
}
</style>
