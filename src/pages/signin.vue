<template>
  <div class="page-container">
    <card>
      <div class="login-container">
        <div class="head">
          <h2>in<span class="pink">Heart</span>Admin</h2>
        </div>
        <form>
          <div class="input-item">
            <label class="custom-label" for="id">이메일</label>
            <input
              autocomplete="true"
              placeholder="이메일을 입력하세요"
              class="custom-input"
              id="id"
              type="text"
              v-model="id">
          </div>
          <div class="input-item">
            <label class="custom-label" for="password">비밀번호</label>
            <input
              autocomplete="true"
              placeholder="비밀번호를 입력하세요"
              class="custom-input"
              id="password"
              type="password"
              v-model="password"
              @keyup.enter="submit"
            >
          </div>
        </form>
        <div class="login-button" @click="signin">로그인</div>
      </div>
    </card>
  </div>
</template>

<script>
  import * as AccountAPI from '../lib/account';
  import Card from '../components/inheart-ui/card';

  export default {
    name: 'signin',
    components: {Card},
    data() {
      return {
        id: '',
        password: '',
      };
    },
    methods: {
      async signin() {
        const check = ({status}) => status === 200 ? this.$router.push('/statistics') : alert('잘못된 로그인 시도입니다.');
        AccountAPI
          .signin({email: this.id, password: this.password})
          .then(check)
          .catch(console.error);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/style";

  .card {
    max-width: 300px;
  }

  input {
    font-family: 'SpoqaHanSans', 'Spoqa Han Sans', sans-serif;
  }

  .page-container {
    min-height: 100vh;
  }

  .page-container, .head {
    @include flex-center;
  }

  .custom-input {
    margin-top: 5px;
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

  .login-button {
    cursor: pointer;
    background: #E76577;
    margin-top: 20px;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
    color: white;
    font-size: 18px;
  }

  h2 {
    font-weight: normal;
  }

  .pink {
    color: #E76577;
  }
</style>
