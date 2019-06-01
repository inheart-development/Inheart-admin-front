<template>
  <div class="meditation-content">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="meditation-content-content">
      <page-header title="명상 컨텐츠 관리" @open-drawer="openDrawer" />
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';
import pageHeader from '../components/PageHeader.vue';

export default {
  name: 'content',
  components: { navigationDrawer, pageHeader },
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
.meditation-content {
  height: 100vh;
  background: linear-gradient(#a7c4cd, #b4a0bd);
}
</style>
