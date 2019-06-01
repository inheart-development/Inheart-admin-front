<template>
  <div class="page-header">
    <img class="menu-icon" @click="openDrawer" src="../assets/ic_black_menu.png" alt="menu icon">
    <h2 class="page-title">{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'page-header',
  props: ['title'],
  methods: {
    openDrawer() {
      this.$emit('open-drawer');
    },
  },
};
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  padding: 1em 1em;
}

.menu-icon {
  width: 2em;
  height: 2em;
}

.page-title {
  flex: 1;
  color: #fff;
  text-align: center;
  margin: 0;
}

</style>
