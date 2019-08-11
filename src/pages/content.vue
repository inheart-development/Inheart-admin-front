<template>
  <div class="container">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="meditation-content-content">
      <page-header title="명상 컨텐츠 관리" @open-drawer="openDrawer"/>
      <top-navigation
        :categories="categories"
        :item_style="{fontSize:'0.8rem',marginLeft:'7px',width:'25%',display:'flex',justifyContent:'center',alignItems:'center',wordBreak:'keep-all'}"
        @change="selectCategory"
      ></top-navigation>
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
  import navigationDrawer from '../components/NavigationDrawer.vue';
  import pageHeader from '../components/PageHeader.vue';
  import CategoryButton from '../components/utils/CategoryButton.vue';
  import ContentPreviewCard from '../components/ContentPreviewCard.vue';
  import ContentDetailViewer from '../components/ContentDetailViewer.vue';
  import { getAllContent, getDetailContent } from '../lib/content';
  import Card from '../components/inheart-ui/card';
  import topNavigation from '../components/inheart-ui/topNavigation';

  export default {
    name: 'contents',
    components: {
      Card,
      navigationDrawer,
      pageHeader,
      CategoryButton,
      ContentPreviewCard,
      ContentDetailViewer,
      topNavigation,
    },
    computed: {
      currentContent() {
        return this.allContent.filter(val => val.categoryNo === this.selectedCategory + 1);
      },
    },
    data() {
      return {
        isDrawerOpened: false,
        categories: [
          {
            name: '머리 비우기',
            color: '#E1B52F'
          },
          {
            name: '마음 비우기',
            color: '#E76577'
          },
          {
            name: '머리 채우기',
            color: '#A55AA2'
          },
          {
            name: '마음 새기기',
            color: '#31a0e2'
          },
        ],
        selectedCategory: 0,
        allContent: [],
        isViewerOpen: false,
        postType: 'create',
        detailContent: {},
      };
    },
    methods: {
      openDrawer() {
        this.isDrawerOpened = true;
      },
      closeDrawer() {
        this.isDrawerOpened = false;
      },
      selectCategory(category) {
        this.selectedCategory = category;
      },
      openViewer() {
        this.isViewerOpen = true;
      },
      closeViewer() {
        this.isViewerOpen = false;
      },
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

</style>
