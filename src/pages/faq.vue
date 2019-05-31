<template>
  <div class="faq">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';

export default {
  name: 'faq',
  components: { navigationDrawer },
};
</script>

<style scoped>
</style>
