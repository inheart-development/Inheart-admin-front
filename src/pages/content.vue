<template>
  <div class="meditation-content">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="meditation-content-content">
      <page-header title="명상 컨텐츠 관리" @open-drawer="openDrawer" />
      <img @click="createContent" class="add-icon" src="../assets/ic_add.png" alt="add"/>
      <div class="category-container">
        <category-button
          v-for="(category, index) in categories"
          :key="index"
          :isSelected="selectedCategory === index"
          :category="category"
          :categoryNo="index"
          @select-category="selectCategory"
        />
      </div>
      <div class="meditation-card-container">
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

export default {
  name: 'content',
  components: {
    navigationDrawer, pageHeader, CategoryButton, ContentPreviewCard, ContentDetailViewer,
  },
  computed: {
    currentContent() {
      return this.allContent.filter(val => val.categoryNo === this.selectedCategory + 1);
    },
  },
  data() {
    return {
      isDrawerOpened: false,
      categories: ['머리비우기', '마음비우기', '마음채우기', '글명상', '자유명상'],
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
.meditation-content {
  min-height: 100vh;
  background: linear-gradient(#a7c4cd, #b4a0bd);
}

.category-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  padding: 0 1em;
  grid-gap: 5px;
}

.add-icon {
  background: #9191c8;
  width: 3em;
  height: 3em;
  border-radius: 1.5em;
  position: fixed;
  bottom: 1em;
  right: 1em;
}

.meditation-card-container {
  display: grid;
  grid-gap: 0.5em;
  padding: 0 1em;
  margin-top: 1em;
}
</style>
