<template>
  <div class="navigation-drawer">
    <div class="navigation-drawer-header">
      <img class="menu-icon" src="../assets/ic_white_menu.png" @click="closeDrawer" />
      <div class="admin-profile">
        <img class="admin-profile-image" src="../assets/ic_userprofile.png" alt="profile-image">
        <span>admin name</span>
      </div>
      <div class="logout-button">로그아웃</div>
    </div>
    <div class="navigation">
      <router-link to="/statistics" class="navigator">통계</router-link>
      <router-link to="/main" class="navigator">명상 컨텐츠 관리</router-link>
      <router-link to="/statistics" class="navigator">명상 설문 관리</router-link>
      <router-link to="/statistics" class="navigator">FAQ 게시글 관리</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation-drawer',
  methods: {
    closeDrawer() {
      this.$emit('close-drawer');
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
}

.navigation-drawer-header {
  padding: 1em;
  box-sizing: border-box;
}

.menu-icon {
  width: 2em;
  height: 2em;
}

.admin-profile {
  display: flex;
  align-items: center;
  color: #fff;

}

.admin-profile-image {
  width: 50px;
  height: 50px;
  margin-right: 1em;
}

.logout-button {
  height: 2em;
  border-radius: 1em;
  background: #fff;
  text-align: center;
  line-height: 2em;
  margin-top: 1rem;
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
