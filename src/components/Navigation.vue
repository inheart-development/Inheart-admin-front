<template>
  <div class="navigation">
    <div class="logo-wrapper" @click="login">
      <p style="font-size:20px;">inHeart Admin</p>
    </div>
    <div>
      <ul>
        <li v-for="(link, index) in links" :key="index" :class="$route.path === `/${link.route}` ? 'active' : null">
          <router-link :to="link.route" class="navigator">
            <span><img :src="`./icon/ic_nav_${link.icon}.svg`" alt="">{{link.name}}</span>
            <img src="../assets/ic_keyboard_arrow_right.png" alt="arrow_right">
          </router-link>
        </li>
        <li @click="logout">
          <div class="navigator">
            <span><img src="../assets/ic_nav_logout.svg" alt="">로그아웃</span>
            <img src="../assets/ic_keyboard_arrow_right.png" alt="arrow_right">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {signout} from '../lib/account';

  export default {
    name: 'navigation',
    props: [],
    data() {
      return {
        links: [
          {
            name: '통계',
            route: 'statistics',
            icon: 'statistics'
          },
          {
            name: '명상 컨텐츠 관리',
            route: 'content',
            icon: 'music'
          },
          {
            name: '앨범 관리',
            route: 'album',
            icon: 'album'
          },
          {
            name: 'FAQ 게시글 관리',
            route: 'faq',
            icon: 'faq'
          },
          {
            name: '공지사항 관리',
            route: 'notice',
            icon: 'notice'
          }
        ],
      };
    },
    methods: {
      async logout() {
        await signout();
        this.$router.push('/');
      },
      login() {
        this.$router.push('/');
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/style";

  p {
    font-size: 18px;
  }

  .navigation {
    position: fixed;
    width: 250px;
    height: 100vh;
    background: #393c65;
    color: #fff;
    padding: 0 20px;
  }

  .logo-wrapper {
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  }

  .logo {
    height: 30px;
  }

  li {
    font-size: 18px;
    height: 45px;
    list-style-type: none;
    opacity: 0.7;
  }

  li.active, li:hover {
    opacity: 1;
  }

  .navigator {
    display: flex;
    justify-content: space-between;
    align-content: center;
    position: relative;
    cursor: pointer;
  }

  .navigator span {
    @include flex-center;
  }

  .navigator img {
    margin-bottom: 2px;
  }

  .navigator > span > img {
    margin-right: 10px;
  }

  .navigator {
    height: 100%;
    display: flex;
    align-items: center;
    width: 100%;
    color: #fff;
    text-decoration: none;
  }

  .navigator:hover {
    opacity: 1;
  }

</style>
