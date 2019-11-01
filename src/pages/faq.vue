<template>
  <div class="container">
    <div class="faq-content">
      <page-header title="FAQ 게시글 관리"/>
      <div class="faq-container">
        <router-link to="edit-faq">
          <card class="add-btn">
            추가하기
          </card>
        </router-link>
        <faq-card
          v-for="faq in faqs"
          :question="faq.faqQuestion"
          :answer="faq.faqAnswer"
          :faqNo="faq.faqNo"
          :key="faq.faqNo"
          @update="updateFaqs"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import pageHeader from '../components/PageHeader.vue';
  import FaqCard from '../components/FaqCard.vue';
  import { getFaqs } from '../lib/faq';

  export default {
    name: 'faq',
    components: {
      Card,
      pageHeader,
      FaqCard,
    },
    data() {
      return {
        faqs: [],
        isEditorOpened: false,
      };
    },
    methods: {
      async updateFaqs() {
        try {
          const response = await getFaqs();
          this.faqs = response.data.data;
        } catch (e) {
          console.log(e);
        }
      },
    },
    mounted() {
      this.updateFaqs();
    },
  };
</script>

<style scoped>
  .container {
    overflow: auto;
    height: 100vh;
    padding-bottom: 20px;
  }

  .add-btn {
    height: 70px;
    font-size: 20px;
    cursor: pointer;
  }
</style>
