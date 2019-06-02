<template>
  <div class="faq">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="faq-content">
      <page-header title="FAQ 게시글 관리" @open-drawer="openDrawer" />
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
import navigationDrawer from '../components/NavigationDrawer.vue';
import pageHeader from '../components/PageHeader.vue';
import FaqCard from '../components/FaqCard.vue';
import { getFaqs } from '../lib/faq';

export default {
  name: 'faq',
  components: { navigationDrawer, pageHeader, FaqCard },
  data() {
    return {
      isDrawerOpened: false,
      faqs: [],
    };
  },
  methods: {
    openDrawer() {
      this.isDrawerOpened = true;
    },
    closeDrawer() {
      this.isDrawerOpened = false;
    },
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
.faq {
  min-height: 100vh;
  background: linear-gradient(#a7c4cd, #b4a0bd);
}

.faq-container {
  display: grid;
  grid-gap: 1em;
  padding: 1em;
}
</style>
