<template>
  <div class="container">
    <page-header :title="isOnModifying ? 'FAQ 수정' : 'FAQ 생성'"/>
    <div>
      <card class="edit-album-container">
        <div class="input-item">
          <label class="custom-label login-label" for="title">제목</label>
          <input
            class="custom-input"
            id="title"
            placeholder="제목을 입력해주세요."
            type="text"
            v-model="faqQuestion"
            autocomplete="off"
          />
        </div>
        <div class="input-item">
          <label class="custom-label login-label" for="content">내용</label>
          <textarea
            class="custom-input"
            id="content"
            placeholder="내용을 입력해주세요."
            type="text"
            v-model="faqAnswer"
            autocomplete="off"
          />
        </div>
      </card>
      <div class="inline-block">
        <card class="button-card" @click="$router.push('/faq')">취소</card>
        <card v-if="!isOnModifying" class="button-card" @click="updateAddFaq">업로드</card>
        <card v-if="isOnModifying" class="button-card" @click="updateModifyFaq">업로드</card>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import pageHeader from '../components/PageHeader.vue';
  import {addFaq, getDetailFaq, modifyFaq} from '../lib/faq';

  export default {
    name: 'edit-faq',
    props: ['faqNo'],
    components: {Card, pageHeader},
    data() {
      return {
        faqQuestion: '',
        faqAnswer: '',
      }
    },
    computed: {
      isOnModifying() {
        return !!this.faqNo;
      }
    },
    methods: {
      async updateFaq(faqNo) {
        const response = await getDetailFaq(faqNo);
        const {data} = response;
        this.faqQuestion = data.data.faqQuestion;
        this.faqAnswer = data.data.faqAnswer;
      },
      async updateAddFaq() {
        await addFaq({
          faqQuestion: this.faqQuestion,
          faqAnswer: this.faqAnswer,
        })
        this.$router.push('faq');
      },
      async updateModifyFaq() {
        await modifyFaq({
          faqQuestion: this.faqQuestion,
          faqAnswer: this.faqAnswer,
          faqNo: this.faqNo
        });
        this.$router.push('faq');
      },
    },
    mounted() {
      if (this.isOnModifying) this.updateFaq(this.faqNo);
    },
  };
</script>

<style lang="scss" scoped>
  .inline-block {
    max-width: 640px;
    margin: 0 auto;
    display: flex;
  }

  .button-card {
    width: calc(50% - 30px);
    padding: 10px;
    user-select: none;
    cursor: pointer;
    &:first-child {
      color:#e03131;
    }
    &:last-child {
      margin-left: 0;
    }
  }

  .container {
    max-height: 100vh;
    overflow: auto;
    flex-direction: column;
    padding: 10px 10px 30px 10px;
  }

  .edit-album-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .input-item {
    width: 100%;
    margin: 15px 15px 15px 0;
  }

  .custom-input {
    border: 0;
    border-bottom: 1px solid #6d6e72;
    background: none;
    font-size: 1rem;
    padding: 5px;
    width: 100%;
    font-weight: 300;
  }

  textarea {
    height:10rem;
    resize: none;
  }
</style>
