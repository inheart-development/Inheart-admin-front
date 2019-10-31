<template>
  <modal>
    <div>
      <card id="inner-space" class="notice-content-wrapper">
        <h2 class="title">{{isOnModifying ? '앨범 수정' : '앨범 생성'}}</h2>
        <div class="input-item">
          <label class="custom-label login-label" for="title">제목</label>
          <input
            class="custom-input"
            id="title"
            placeholder="제목을 입력해주세요."
            type="text"
            v-model="title"
            autocomplete="off"
          />
        </div>
        <div class="input-item">
          <label class="custom-label login-label" for="explain">내용</label>
          <textarea
            class="custom-input"
            id="content"
            placeholder="내용을 입력해주세요."
            type="text"
            v-model="content"
            autocomplete="off"
          />
        </div>
        <album-selector />
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
  import AlbumSelector from './AlbumSelector';

  export default {
    name: 'notice-editor',
    components: {
      Card,
      Modal,
      AlbumSelector
    },
    props: ['isOnModifying'],
    data() {
      return {
        title: '',
        content: '',
        id: '',
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
  }
</style>
