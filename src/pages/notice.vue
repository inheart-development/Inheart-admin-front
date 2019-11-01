<template>
  <div class="container">
    <div class="faq-content">
      <page-header title="공지사항 관리"/>
      <card @click="createNotice" class="add-btn">
        추가하기
      </card>
      <card  v-for="notice in notices" :key="notice.noticeNo" class="notice-card">
        <div class="notice-description">
          <p class="title">{{notice.noticeTitle}}</p>
          <p>{{notice.noticeText}}</p>
        </div>
        <div class="buttons">
          <floating-button @click="modifyNotice(contentNo)">
            <img class="edit" src="../../public/icon/edit.svg" alt="edit" />
          </floating-button>
          <floating-button @click="updateDeleteNotice($event, notice.noticeNo)">
            <img
              class="delete"
              src="../../public/icon/delete.svg"
              alt="delete"
            />
          </floating-button>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import floatingButton from '../components/inheart-ui/floatingButton';
  import pageHeader from '../components/PageHeader.vue';
  import NoticeEditor from '../components/NoticeEditor';
  import { getNotices, deleteNotice } from '../lib/notice'

  export default {
    name: 'notice',
    components: { Card, pageHeader, NoticeEditor, floatingButton },
    data() {
      return {
        notices: [],
      };
    },
    methods: {
      createNotice() {
        this.$router.push('edit-notice')
      },
      modifyNotice(id) {
        this.$router.push('edit-notice')
      },
      async updateNotice() {
        try {
          const response = await getNotices();
          this.notices = response.data.data;
        } catch (e) {
          console.log(e);
        }
      },
      async updateDeleteNotice(e, id) {
        e.preventDefault();
        await deleteNotice(id)
        this.updateNotice();
      }
    },
    mounted() {
      this.updateNotice();
    },
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
.notice-card {
  color: #000;
  min-height: 100px;
	height: auto;
	display: flex;
  justify-content: flex-start;
  position: relative;
  align-items: center;
}
.buttons {
  position: absolute;
  right: 20px;
}

.buttons > * {
  margin-right: 10px;
}
/* 
.edit {
  width: 24px;
  position: absolute;
  right: 40px;
} */

.notice-description .title {
  font-weight: bold;
  margin-bottom: 0.6em;
}
</style>
