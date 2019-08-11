<template>
  <div class="user-card">
    <img class="user-profile" :src="propfileUrl" alt="propfile"/>
    <div class="user-info">
      <p class="user-name">{{user.userName}}</p>
      <p class="user-email">{{user.userEmail}}</p>
    </div>
    <div class="icon-container">
      <floating-button><img @click="openDetail" src="../../public/icon/info.svg" alt="arrow_down"></floating-button>
      <floating-button class="pink"><img @click="onDeleteUser" src="../../public/icon/delete.svg" alt="delete"></floating-button>
    </div>
  </div>
</template>

<script>
  import { deleteUser } from '../lib/user';
  import FloatingButton from './inheart-ui/floatingButton';

  export default {
    components: { FloatingButton },
    props: ['user'],
    computed: {
      propfileUrl() {
        return `http://54.180.153.125:3000/pImg/${this.user.userImage}`;
      },
    },
    methods: {
      openDetail() {
        this.$emit('open-detail');
      },
      async onDeleteUser() {
        // eslint-disable-next-line
        if (confirm('유저를 삭제하시겠습니까?')) {
          try {
            await deleteUser({ num: this.user.userNo });
            this.$emit('update');
            // eslint-disable-next-line
            alert('유저를 삭제했습니다.');
          } catch (e) {
            // eslint-disable-next-line
            console.log(e);
            // eslint-disable-next-line
            alert('유저를 삭제하지 못했습니다.');
          }
        }
      },
    },
  };
</script>

<style scoped>
  .pink {
    background: #e74c3c;
  }

  .user-card {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-profile {
    width: 3.5em;
    height: 3.5em;
  }

  .user-info > p {
    margin: 0;
  }

  .user-info > .user-email {
    margin-top: 0.8em;
  }

  .floating-button {
    margin-right: 10px;
  }

  .floating-button img {
    padding: 5px;
  }


</style>
