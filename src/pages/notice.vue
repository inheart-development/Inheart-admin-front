<template>
  <div class="container">
    <div class="faq-content">
      <page-header title="공지사항 관리"/>
    </div>
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import pageHeader from '../components/PageHeader.vue';

  export default {
    name: 'notice',
    components: { Card, pageHeader }
  };
</script>

<style scoped>
.container {
    min-height: 100vh;
}
</style>
