<template>
  <div class="container">
    <div class="faq-content">
      <page-header title="공지사항 관리"/>
      <div @click="createNotice">
        <card class="add-btn">
          추가하기
        </card>
      </div>
    </div>
    <notice-editor v-if="isEditorOpened" @close-editor="closeEditor" />
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import pageHeader from '../components/PageHeader.vue';
  import NoticeEditor from '../components/NoticeEditor';

  export default {
    name: 'notice',
    components: { Card, pageHeader, NoticeEditor },
    data() {
      return {
        isEditorOpened: false,
      };
    },
    methods: {
      createNotice() {
        console.log('create notice');
        this.isEditorOpened = true;
      },
      closeEditor() {
        this.isEditorOpened = false;
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
