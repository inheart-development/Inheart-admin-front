<template>
  <div class="container">
    <div class="meditation-content-content">
      <page-header title="명상 컨텐츠 관리" @open-drawer="openDrawer"/>
      <div class="meditation-card-container">
        <div @click="createContent">
          <card class="add-btn">
            추가하기
          </card>
        </div>
        <content-preview-card
          v-for="(data, i) in currentContent"
          :key="i"
          :contentNo="data.contentsNo"
          :contentTitle="data.contentsTitle"
          :contentExplain="data.contentsExplain"
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
  import { getAllContent, getDetailContent } from '../lib/content';
  import Card from '../components/inheart-ui/card';
  import topNavigation from '../components/inheart-ui/topNavigation';
  import buttonList from '../components/inheart-ui/button-list'

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
    computed: {
      currentContent() {
        return this.allContent.filter(val => val.categoryNo === this.selectedCategory + 1);
      },
    },
    data() {
      return {
        tags: ['잔잔한', '평온한', '따뜻한', '시원한', '행복한', '기쁜', '긍정적인'],
        isDrawerOpened: false,
        allContent: [],
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
        this.getDetailContentData(contentNo);
        this.postType = 'modify';
        this.openViewer();
      },
      async getAllContentData() {
        try {
          const response = await getAllContent();
          this.allContent = response.data.data;
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      },
      async getDetailContentData(contentsNo) {
        try {
          const response = await getDetailContent({ contentsNo });
          this.detailContent = response.data.data;
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      },
      update() {
        this.getAllContentData();
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
    padding: 10px 10px 30px 10px;
    min-height: 100vh;
  }

  .select-box {
    height: auto;
    margin-top: 0;
  }

</style>
