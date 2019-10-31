<template>
  <div class="container">
    <div class="meditation-content-content">
      <page-header title="명상 컨텐츠 관리"/>
      <div class="meditation-card-container">
        <div @click="createContent">
          <card class="add-btn">
            추가하기
          </card>
        </div>
        <content-preview-card
          v-for="data in meditations"
          :key="data.meditationNo"
          :contentNo="data.meditationNo"
          :contentTitle="data.meditationTitle"
          :contentExplain="data.meditationExplain"
          @modify-content="modifyContent"
          @update="update"
        />
      </div>
    </div>
    <content-detail-viewer
      v-if="isViewerOpen"
      @close-viewer="closeViewer"
      :postType="postType"
      :detailPost="detailContent"
      @update="update"
    />
  </div>
</template>

<script>
  import pageHeader from '../components/PageHeader.vue';
  import CategoryButton from '../components/utils/CategoryButton.vue';
  import ContentPreviewCard from '../components/ContentPreviewCard.vue';
  import ContentDetailViewer from '../components/ContentDetailViewer.vue';
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
      ContentDetailViewer,
      topNavigation,
      buttonList
    },
    data() {
      return {
        tags: ['잔잔한', '평온한', '따뜻한', '시원한', '행복한', '기쁜', '긍정적인'],
        isDrawerOpened: false,
        meditations: [],
        isViewerOpen: false,
        postType: 'create',
        detailContent: {},
      };
    },
    methods: {
      createContent() {
        this.postType = 'create';
        this.openViewer();
      },
      modifyContent(contentNo) {
        this.updateDetailMeditaion(contentNo);
        this.postType = 'modify';
        this.openViewer();
      },
      openViewer() {
        this.isViewerOpen = true;
      },
      closeViewer() {
        this.isViewerOpen = false;
      },
      async updateMeditations() {
        const response = await getMeditations();
        const { data } = response;
        this.meditations = data.data;
      },
      async updateDetailMeditaion(contentNo) {
        const response = await getDetailMeditation(contentNo);
        const { data } = response;
        this.detailContent = data.data;
      },
      update() {
        this.updateMeditations()
      },
    },
    mounted() {
      this.update();
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
    min-height: 100vh;
  }

  .select-box {
    height: auto;
    margin-top: 0;
  }

</style>
