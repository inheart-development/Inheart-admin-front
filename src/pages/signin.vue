<template>
  <div class="sign-in">
    <div class="sign-in-header">
      <h1 class="sign-in-title">InHeart</h1>
      <h2 class="sign-in-sub-title">관리자 로그인</h2>
    </div>
    <input class="input-box" placeholder="id" v-model="id">
    <input type="password" class="input-box" placeholder="password" v-model="password">
    <div class="sign-in-btn">로그인</div>
    <img class="midas-logo" :src="require('@/assets/logo.png')" :alt="'logo'">
  </div>
</template>

<script>
export default {
  name: 'signin',
  data() {
    return {
      id: '',
      password: '',
    };
  },
};
</script>

<style scoped>
.sign-in {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#a7c4cd, #b4a0bd);
  color: #fff;
}

.sign-in-header {
  position: absolute;
  top: 20%;
}

.sign-in-title {
  text-align: center;
  margin: 0;
  font-size: 3em;
}

.sign-in-sub-title {
  text-align: center;
  margin: 0;
  font-size: 1em;
}

.input-box {
  font-size: 16px;
  height: 2em;
  background-color: transparent;
  color: #fff;
  border-radius: 15px;
  border: 1px solid #fff;
  padding: 0 10px;
  box-sizing: border-box;
  width: 80%;
  margin-top: 1em;
}

.input-box::placeholder {
  color: #fff;
}

.sign-in-btn {
  height: 2em;
  color: rgba(0, 0, 0, 0.5);
  background: #fff;
  border-radius: 1em;
  padding: 0 10px;
  line-height: 2em;
  box-sizing: border-box;
  width: 80%;
  margin-top: 2em;
  text-align: center;
}

.midas-logo {
  width: 100px;
  position: absolute;
  bottom: 20px;
}
</style>
