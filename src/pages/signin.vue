<template>
  <div class="signin">
    <h1>InHeart</h1>
    <h2>관리자 로그인</h2>
    <input class="input-box">
    <input class="input-box">
    <div>로그인</div>
    <img :src="require('@/assets/logo.png')" :alt="'logo'">
  </div>
</template>

<script>
export default {
  name: "signin",
  data() {
    return {
      id: "",
      password: ""
    };
  }
};
</script>

<style scoped>
.sign-in {
}
</style>
