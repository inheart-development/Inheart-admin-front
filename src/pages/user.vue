<template>
  <div class="user">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';

export default {
  name: 'user',
  components: { navigationDrawer },
};
</script>

<style scoped>
</style>
