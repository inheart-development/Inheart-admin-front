<template>
  <div class="statistics">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="statistics-content">
      <div class="statistics-header">
        <img
          class="menu-icon"
          @click="openDrawer"
          src="../assets/ic_black_menu.png"
          alt="menu icon"
        >
        <h2 class="statistics-title">통계</h2>
      </div>
      <div >

      </div>
    </div>
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';

export default {
  name: 'statistics',
  components: { navigationDrawer },
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

.statistics-header {
  display: flex;
  align-items: center;
  padding: 1em 1em;
}

.menu-icon {
  width: 2em;
  height: 2em;
}

.statistics-title {
  flex: 1;
  color: #fff;
  text-align: center;
  margin: 0;
}
</style>
