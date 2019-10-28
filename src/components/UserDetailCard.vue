<template>
  <modal :is_open="isOpen">
    <div>
      <card>
        <img class="profile" :src="profileImage" alt="profile">
        <div class="info">
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
        </div>
      </card>
      <div @click="onDeleteUser">
        <card class="btn-card red-card">계정삭제</card>
      </div>
      <div @click="closeModal">
        <card class="btn-card">닫기</card>
      </div>
    </div>
  </modal>
</template>

<script>
  import { getDetailUser, deleteUser } from '../lib/user';
  import Modal from './inheart-ui/modal';
  import Card from './inheart-ui/card';

  export default {
    components: {
      Card,
      Modal
    },
    props: ['num'],
    data() {
      return {
        isOpen: true,
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
      closeModal() {
        this.isOpen = false;
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
        if (confirm('유저를 삭제하시겠습니까?')) {
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
  .red-card {
    color: white;
    background: #e74c3c;
  }

  .btn-card {
    cursor: pointer;
    height: 70px;
    font-size: 20px;
  }

  .profile {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    padding: 10px;
  }

  .user-name, .user-email, .meditation-num, .statis-container {
    margin: 0;
    margin-top: 0.5em;
  }
  .meditation-num{
    text-align: center;
  }
  .statis-container {
    width: 100%;
    display: grid;
    justify-items: center;
    grid-template-columns: auto auto auto auto;
  }

  .statis-container > p {
    margin: 0;
    padding: 10px;
  }

</style>
