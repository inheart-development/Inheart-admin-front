<template>
  <div class="container">
    <div class="faq-content">
      <page-header title="FAQ 게시글 관리" @open-drawer="openDrawer"/>
      <div class="faq-container">
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
  </div>
</template>

<script>
  import pageHeader from '../components/PageHeader.vue';
  import FaqCard from '../components/FaqCard.vue';
  import { getFaqs } from '../lib/faq';

  export default {
    name: 'faq',
    components: {
      pageHeader,
      FaqCard
    },
    data() {
      return {
        faqs: [],
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
</style>
