<template>
  <div class="navigation-drawer">
    <div class="navigation-drawer-header">
      <img class="menu-icon" src="../assets/ic_white_menu.png" @click="closeDrawer" />
      <div @click="onSignout" class="logout-button">로그아웃</div>
    </div>
    <div class="navigation">
      <router-link to="/statistics" class="navigator">통계</router-link>
      <router-link to="/content" class="navigator">명상 컨텐츠 관리</router-link>
      <router-link to="/survey" class="navigator">명상 설문 관리</router-link>
      <router-link to="/faq" class="navigator">FAQ 게시글 관리</router-link>
      <router-link to="/user" class="navigator">사용자 계정 관리</router-link>
    </div>
  </div>
</template>

<script>
import { signout } from '../lib/account';

export default {
  name: 'navigation-drawer',
  methods: {
    closeDrawer() {
      this.$emit('close-drawer');
    },
    async onSignout() {``
      try {
        await signout();
        // eslint-disable-next-line
        alert('로그아웃 되었습니다.');
        this.$router.push('/');
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.navigation-drawer {
  position: absolute;
  top: 0;
  left: 0;
  background: #48a3e1;
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
  z-index:3;
}

.navigation-drawer-header {
  padding: 1em;
  box-sizing: border-box;
}

.menu-icon {
  width: 2em;
  height: 2em;
}

.logout-button {
  height: 2em;
  border-radius: 1em;
  background: #fff;
  text-align: center;
  line-height: 2em;
  margin-top: 1rem;
}

.logout-button:hover {
  cursor: pointer;
}

.navigation {
  display: flex;
  flex-direction: column;
  background: #81819c;
  flex: 1;
}

.navigator {
  color: #fff;
  text-decoration: none;
  padding: 15px 10px;
}

.navigator:hover, .navigator:focus {
  opacity: 1;
  background: #9191c8;
}
</style>
