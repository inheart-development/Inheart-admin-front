<template>
  <div class="user-card">
    <img class="user-profile" :src="propfileUrl" alt="propfile" />
    <div class="user-info">
      <p class="user-name">{{user.userName}}</p>
      <p class="user-email">{{user.userEmail}}</p>
    </div>
    <div class="icon-container">
      <img class="icon" @click="onDeleteUser" src="../assets/ic_clear.png" alt="clear">
      <img class="icon" @click="openDetail" src="../assets/ic_arrow_down.png" alt="arrow_down">
    </div>
  </div>
</template>

<script>
import { deleteUser } from '../lib/user';

export default {
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
      if(confirm('유저를 삭제하시겠습니까?')) {
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
.user-card {
  display: grid;
  grid-template-columns: 3.5em auto 1.5em;
  grid-gap: 1em;
  align-items: center;
  padding: 0.5em;
  background: #fff;
  border-radius: 4px;
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

.icon-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.icon {
  width: 1.5em;
  height: 1.5em;
}

</style>
