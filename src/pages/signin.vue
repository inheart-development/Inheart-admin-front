<template>
  <div class="page-container">
    <div class="login-container">
      <div class="head">
        <h2><span class="app">in<span class="pink">Heart</span> Admin</span></h2>
      </div>
      <div class="input-container">
        <div class="input-item">
          <label class="custom-label" for="id">
            <icon name="account"/>
          </label>
          <input
              autocomplete="true"
              placeholder="ID"
              class="custom-input"
              id="id"
              type="text"
              v-model="id">
        </div>
        <div class="input-item">
          <label class="custom-label" for="password">
            <icon name="lock"/>
          </label>
          <input
              autocomplete="true"
              placeholder="Password"
              class="custom-input"
              id="password"
              type="password"
              v-model="password"
              @keyup.enter="signin"
          >
        </div>
      </div>
      <div class="login-button" @click="signin">Login</div>
    </div>
  </div>
</template>

<script>
  import * as AccountAPI from '../lib/account';
  import Card from '../components/inheart-ui/card';
  import Icon from "../components/inheart-ui/icon";

  export default {
    name: 'signin',
    components: {Icon, Card},
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

  .head > h2 {
    font-size: 36px;
    font-family: 'Comfortaa', sans-serif;
    font-weight: 600;
    letter-spacing: 0;
  }

  .head > p {
    font-size: 18px;
    margin-top: 12px;
    letter-spacing: -.05em;
  }

  .head {
    margin-bottom: 10px;
  }

  .login-container {
    width: 450px;
    max-width: calc(100vw - 60px);
  }

  .input-container {
    flex-direction: column;
  }

  input {
    font-family: 'SpoqaHanSans', 'Spoqa Han Sans', sans-serif;
  }

  .page-container, .input-container, .input-item {
    @include flex-center;
  }

  .page-container {
    height: 99vh;
    width: 100%;
  }

  .input-item {
    padding: 10px 0;
    width: 100%;
    text-align: center;

    label {
      width: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 41px;
      padding: 8px 10px;
      background: #f1f3f5;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    input {
      flex: 1;
      font-size: 17px;
      height: 41px;
      padding: 8px;
      background: #f1f3f5;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      font-family: 'Comfortaa', sans-serif;
      font-weight: 300;

      &::placeholder {
        color: $dark-placeholder-color;
      }
    }
  }

  .login-button {
    cursor: pointer;
    background: #ff6f85;
    margin-top: 20px;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
    color: white;
    transition: box-shadow, .2s ease-in-out;
    padding: 12px 0;
    font-family: 'Comfortaa', sans-serif;
    font-weight: 700;

    &:hover {
      box-shadow: 2px 2px 15px 0 #dee2e6;
    }

    font-size: 18px;
  }

  h2 {
    font-weight: normal;
  }

  .pink {
    color: #E76577;
  }
</style>
