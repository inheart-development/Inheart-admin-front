<template>
  <div class="container">
    <div class="meditation-content-content">
      <page-header title="명상 컨텐츠 관리"/>
      <div class="meditation-card-container">
        <card @click="createContent" class="add-btn">
          추가하기
        </card>
        <content-preview-card
          v-for="data in meditations"
          :key="data.meditationNo"
          :contentNo="data.meditationNo"
          :contentTitle="data.meditationTitle"
          :contentExplain="data.meditationExplain"
          @modify-content="modifyContent"
          @update="updateMeditations"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import pageHeader from '../components/PageHeader.vue';
  import CategoryButton from '../components/utils/CategoryButton.vue';
  import ContentPreviewCard from '../components/ContentPreviewCard.vue';
  import Card from '../components/inheart-ui/card';
  import topNavigation from '../components/inheart-ui/topNavigation';
  import buttonList from '../components/inheart-ui/button-list'
  import { getMeditations, getDetailMeditation } from '../lib/content';

  export default {
    name: 'contents',
    components: {
      Card,
      pageHeader,
      CategoryButton,
      ContentPreviewCard,
      topNavigation,
      buttonList
    },
    data() {
      return {
        tags: ['잔잔한', '평온한', '따뜻한', '시원한', '행복한', '기쁜', '긍정적인'],
        meditations: [],
        detailContent: {},
      };
    },
    methods: {
      createContent() {
        this.$router.push('edit-meditation');
      },
      async updateMeditations() {
        const response = await getMeditations();
        const { data } = response;
        this.meditations = data.data;
      },
      modifyContent(id) {
        this.$router.push(`edit-meditation?meditationNo=${modifyContent}`)
      }
    },
    mounted() {
      this.updateMeditations();
    },
  };
</script>

<style scoped>
  .add-btn {
    height: 70px;
    font-size: 20px;
    cursor: pointer;
  }

  .container {
    overflow: auto;
    height: 100vh;
    overflow: auto;
    padding-bottom: 20px;
  }

  .select-box {
    height: auto;
    margin-top: 0;
  }

</style>
