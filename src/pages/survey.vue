<template>
  <div class="survey">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';

export default {
  name: 'survey',
  components: { navigationDrawer },
};
</script>

<style scoped>
</style>
