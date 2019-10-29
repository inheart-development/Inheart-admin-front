<template>
  <div class="container">
    <div class="faq-content">
      <page-header title="공지사항 관리"/>
      <card class="add-btn" @click="createNotice">
        추가하기
      </card>
    </div>
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import pageHeader from '../components/PageHeader.vue';

  export default {
    name: 'notice',
    components: { Card, pageHeader },
    methods: {
      createNotice() {
        
      }
    }
  };
</script>

<style scoped>
.container {
  min-height: 100vh;
}
.add-btn {
  height: 70px;
  font-size: 20px;
  cursor: pointer;
}
</style>
