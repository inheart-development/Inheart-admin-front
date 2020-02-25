<template>
  <div class="container">
    <page-header :title="isOnModifying ? '공지 수정' : '공지 생성'"/>
    <div>
      <card id="inner-space" class="notice-content-wrapper">
        <h2 class="title">공지사항 등록</h2>
        <div class="input-item">
          <label class="custom-label login-label" for="title">제목</label>
          <input
            class="custom-input"
            id="title"
            placeholder="제목을 입력해주세요."
            type="text"
            v-model="noticeTitle"
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
            v-model="noticeText"
            autocomplete="off"
          />
        </div>
      </card>
      <card v-if="!isOnModifying" class="btn-card" @click="updateAddNotice">업로드</card>
      <card v-if="isOnModifying" class="btn-card" @click="updateModifyNotice">업로드</card>
      <router-link to="/notice">
        <card class="btn-card">닫기</card>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import pageHeader from '../components/PageHeader.vue';
  import AlbumSelector from '../components/AlbumSelector';
  import { addNotice, getDetailNotice, modifyNotice } from '../lib/notice';
  export default {
    name: 'edit-notice',
    props: ['noticeNo'],
    components: { Card, pageHeader, AlbumSelector },
    data() {
      return {
        noticeTitle: '',
        noticeText: ''
      }
    },
    computed: {
      isOnModifying() {
        return !!this.noticeNo
      },
    },
    methods: {
      async updateNoticeInfo(id) {
        const response = await getDetailNotice(id);
        const { data } = response;
        this.noticeTitle = data.data.noticeTitle;
        this.noticeText = data.data.noticeText;
      },
      async updateAddNotice() {
        await addNotice({
          noticeTitle: this.noticeTitle,
          noticeText: this.noticeText
        });
        this.$router.push('notice');
      },
      async updateModifyNotice() {
        await modifyNotice({
          noticeNo: parseInt(this.noticeNo),
          noticeTitle: this.noticeTitle,
          noticeText: this.noticeText
        });
        this.$router.push('notice');
      }
    },
    mounted() {
      if(this.isOnModifying) this.updateNoticeInfo(this.noticeNo)
    },
  };
</script>

<style scoped>
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
    .btn-card-container {
    width: 280px;
  }
</style>
