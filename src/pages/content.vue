<template>
  <div class="meditation-content">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="meditation-content-content">
      <page-header title="명상 컨텐츠 관리" @open-drawer="openDrawer" />
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
      </div>
    </div>
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';
import pageHeader from '../components/PageHeader.vue';
import CategoryButton from '../components/utils/CategoryButton.vue';

export default {
  name: 'content',
  components: { navigationDrawer, pageHeader, CategoryButton },
  data() {
    return {
      isDrawerOpened: false,
      categories: ['머리비우기', '마음비우기', '마음채우기', '글명상'],
      selectedCategory: 0,
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
  },
};
</script>

<style scoped>
.meditation-content {
  height: 100vh;
  background: linear-gradient(#a7c4cd, #b4a0bd);
}

.category-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 0 1em;
  grid-gap: 5px;
}
</style>
