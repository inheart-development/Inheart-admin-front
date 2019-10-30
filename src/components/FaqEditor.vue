<template>
  <modal>
    <div>
      <card id="inner-space" class="notice-content-wrapper">
        <h2 class="title">FAQ 등록</h2>
        <div class="input-item">
          <label class="custom-label login-label" for="title">질문</label>
          <input
            class="custom-input"
            id="title"
            placeholder="질문을 입력해주세요."
            type="text"
            v-model="title"
            autocomplete="off"
          />
        </div>
        <div class="input-item">
          <label class="custom-label login-label" for="explain">응답</label>
          <textarea
            class="custom-input"
            id="content"
            placeholder="응답을 입력해주세요."
            type="text"
            v-model="content"
            autocomplete="off"
          />
        </div>
      </card>
      <div class="button-container">
        <div class="btn-card-container">
          <card class="btn-card"> 업로드</card>
        </div>
        <div class="btn-card-container" @click="onCloseEditor">
          <card class="btn-card">닫기</card>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
  import { postNewContent, modifyContent } from '../lib/content';
  import Modal from './inheart-ui/modal';
  import Card from './inheart-ui/card';

  export default {
    name: 'faq-editor',
    components: {
      Card,
      Modal,
    },
    props: [],
    data() {
      return {
        title: '',
        content: '',
        id: '',
        tags: [],
        newTag: '',
      };
    },
    methods: {
      onCloseEditor() {
        this.$emit('close-editor');
      },
    },
  };
</script>

<style scoped>
  .btn-card-container {
    width: 280px;
  }
  .title {
    text-align: center;
    margin-bottom: 1rem;
  }
  .button-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 600px;
  }

  .notice-content-wrapper {
    margin-top: 0;
    height: auto;
    max-height: 80vh;
    overflow: auto;
    display: block;
  }

  .btn-card {
    height: 60px;
    font-size: 20px;
    cursor: pointer;
    width: 100%;
  }

  .input-item {
    width: 100%;
    margin: 15px 15px 15px 0;
  }

  label {
    font-weight: 500;
    display: block;
    font-size: 18px;
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
    resize: none;
  }

  #content {
    height: 300px;
  }
</style>
