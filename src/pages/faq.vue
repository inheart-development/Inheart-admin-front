<template>
  <div class="faq">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="faq-content">
      <page-header title="FAQ 게시글 관리" @open-drawer="openDrawer" />
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';
import pageHeader from '../components/PageHeader.vue';

export default {
  name: 'faq',
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
.faq {
  height: 100vh;
  background: linear-gradient(#a7c4cd, #b4a0bd);
}
</style>
