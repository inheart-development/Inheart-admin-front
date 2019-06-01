<template>
  <div class="statistics">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="statistics-content">
      <page-header title="통계" @open-drawer="openDrawer" />
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';
import pageHeader from '../components/PageHeader.vue';

export default {
  name: 'statistics',
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
.statistics {
  height: 100vh;
  background: linear-gradient(#a7c4cd, #b4a0bd);
}
</style>
