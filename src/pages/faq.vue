<template>
  <div class="container">
    <div class="faq-content">
      <page-header title="FAQ 게시글 관리"/>
      <div class="faq-container">
        <card @click="openEditor" class="add-btn">
          추가하기
        </card>
        <faq-card
          v-for="faq in faqs"
          :question="faq.faqQuestion"
          :answer="faq.faqAnswer"
          :index="faq.faqNo"
          :key="faq.faqNo"
          @update="getFaqData"
        />
      </div>
    </div>
    <faq-editor v-if="isEditorOpened" @close-editor="closeEditor" />
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import pageHeader from '../components/PageHeader.vue';
  import FaqCard from '../components/FaqCard.vue';
  import { getFaqs } from '../lib/faq';
  import FaqEditor from '../components/FaqEditor';

  export default {
    name: 'faq',
    components: {
      Card,
      pageHeader,
      FaqCard,
      FaqEditor
    },
    data() {
      return {
        faqs: [],
        isEditorOpened: false,
      };
    },
    methods: {
      async getFaqData() {
        try {
          const response = await getFaqs();
          this.faqs = response.data.data;
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      },
      openEditor() {
        this.isEditorOpened = true;
      },
      closeEditor() {
        this.isEditorOpened = false;
      }
    },
    mounted() {
      this.getFaqData();
    },
  };
</script>

<style scoped>

  .container {
    overflow: auto;
    padding: 10px 10px 30px 10px;
    min-height: 100vh;
  }

  .add-btn {
    height: 70px;
    font-size: 20px;
    cursor: pointer;
  }
</style>
