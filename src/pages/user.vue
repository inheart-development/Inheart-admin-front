<template>
  <div class="user">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="user-content">
      <page-header title="사용자 계정 관리" @open-drawer="openDrawer" />
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';
import pageHeader from '../components/PageHeader.vue';

export default {
  name: 'user',
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
.user {
  height: 100vh;
  background: linear-gradient(#a7c4cd, #b4a0bd);
}
</style>
