<template>
  <div class="user-detail-card">
    <img
      class="close-icon"
      @click="closeDetail"
      src="../assets/ic_arrow_up.png"
      alt="arrow_up"
    />
    <img class="profile" :src="profileImage" alt="profile">
    <p class="user-name">{{user.userName}}</p>
    <p class="user-email">{{user.userEmail}}</p>
    <p class="meditation-num">명상 횟수</p>
    <div class="statis-container">
      <p class="statis-header">머리비우기</p>
      <p class="statis-header">마음비우기</p>
      <p class="statis-header">마음채우기</p>
      <p class="statis-header">글명상</p>
      <p>{{user.categoryNo_1}}</p>
      <p>{{user.categoryNo_2}}</p>
      <p>{{user.categoryNo_3}}</p>
      <p>{{user.categoryNo_4}}</p>
    </div>
    <div @click="onDeleteUser" class="user-delete-button">계정삭제</div>
  </div>
</template>

<script>
import { getDetailUser, deleteUser } from '../lib/user';

export default {
  props: ['num'],
  data() {
    return {
      user: {
        userName: '',
        userEmail: '',
        userImage: '',
        categoryNo_1: '',
        categoryNo_2: '',
        categoryNo_3: '',
        categoryNo_5: '',
      },
    };
  },
  computed: {
    profileImage() {
      return `http://54.180.153.125:3000/pImg/${this.user.userImage}`;
    },
  },
  methods: {
    closeDetail() {
      this.$emit('close-detail');
    },
    async getDetailUserData() {
      try {
        const response = await getDetailUser({ num: this.num });
        this.user = response.data.data;
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    },
    async onDeleteUser() {
      // eslint-disable-next-line
      if(confirm('유저를 삭제하시겠습니까?')) {
        try {
          await deleteUser({ num: this.num });
          // eslint-disable-next-line
          alert('유저를 삭제했습니다.');
          this.$emit('update');
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    },
  },
  mounted() {
    this.getDetailUserData();
  },
};
</script>

<style scoped>
.user-detail-card {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1em;
  align-items: center;
  background: #fff;
}

.profile {
  width: 80%;
}

.user-name, .user-email, .meditation-num, .statis-container, .user-delete-button {
  margin: 0;
  margin-top: 0.5em;
}

.close-icon {
  position: absolute;
  height: 1.5em;
  width: 1.5em;
  top: 0.5em;
  right: 0.5em;
}

.statis-container {
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: auto auto auto auto;
}

.statis-container > p {
  margin: 0;
}

.statis-container > .statis-header {
  margin-bottom: 0.5em;
}

.user-delete-button {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
  text-align: center;
  background: #e74c3c;
  color: #fff;
}

.user-delete-button:hover {
  cursor: pointer;
}
</style>
