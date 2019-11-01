<template>
  <div class="container flex-center">
    <card class="signin-container">
      <div class="flex-box padding-container">
        <div class="title flex-center">
          <div class="flex-box">
            <div class="app-name">in<span class="pink">Heart</span> Admin</div>
            <div class="signup-text">로그인</div>
          </div>
        </div>
        <div class="input-item">
          <label class="custom-label login-label" for="email">이메일</label>
          <input
            class="custom-input"
            id="email"
            placeholder="예 : example@midasit.com"
            type="email"
            v-model="id"
          >
        </div>
        <div class="input-item">
          <label class="custom-label login-label" for="pw">비밀번호</label>
          <input
            class="custom-input"
            id="pw"
            placeholder="비밀번호를 입력하세요"
            type="password"
            v-model="password"
          >
        </div>
        <div @click="signin" class="custom-button login-button">로그인</div>
      </div>
    </card>
  </div>
</template>

<script>
  import { signin } from '../lib/account';
  import Card from '../components/inheart-ui/card';

  export default {
    name: 'signin',
    components: { Card },
    data() {
      return {
        id: '',
        password: '',
      };
    },
    methods: {
      async signin() {
        try {
          const response = await signin({
            email: this.id,
            password: this.password,
          });
          if (response.status === 200) {
            this.$router.push('/statistics');
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>

<style scoped>
  .pink {
    color: #E76577;
  }

  .login-button {
    margin-top: 15px;
    text-align: center;
  }

  .app-name {
    font-size: 2.5rem;
  }

  .signup-text {
    font-size: 24px;
    text-align: center;
  }

  .padding-container {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  input {
    font-family: 'SpoqaHanSans', 'Spoqa Han Sans', sans-serif;
  }

  .signin-container {
    height: auto;
    animation: show .5s;
  }

  .container {
    height: 100vh;
  }

  .custom-button {
    border: 2px solid #e1b52f;
    border-radius: 500px;
    padding: 10px;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .custom-input {
    border: 0;
    border-bottom: 1px solid #6d6e72;
    background: none;
    font-size: 1rem;
    padding: 5px;
    width: 16rem;
    font-weight: 300;
  }

  .input-item {
    width: 16rem;
    margin: 15px auto auto;
  }

  label {
    font-weight: 500;
    display: block;
    font-size: 18px;
  }
</style>
