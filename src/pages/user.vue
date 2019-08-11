<template>
  <div class="container">
    <navigation-drawer
      v-show="isDrawerOpened"
      @close-drawer="closeDrawer"
    />
    <div class="user-content">
      <page-header title="사용자 계정 관리" @open-drawer="openDrawer"/>
      <div class="user-card-container">
        <user-card-combination
          v-for="user in users"
          :user="user"
          :key="user.userNo"
          @update="update"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import navigationDrawer from '../components/NavigationDrawer.vue';
  import pageHeader from '../components/PageHeader.vue';
  import UserCardCombination from '../components/UserCardCombination.vue';

  import { getUsers } from '../lib/user';

  export default {
    name: 'user',
    components: {
      navigationDrawer,
      pageHeader,
      UserCardCombination
    },
    data() {
      return {
        isDrawerOpened: false,
        users: [],
      };
    },
    methods: {
      openDrawer() {
        this.isDrawerOpened = true;
      },
      closeDrawer() {
        this.isDrawerOpened = false;
      },
      async getUserData() {
        try {
          const response = await getUsers();
          this.users = response.data.data;
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      },
      update() {
        this.getUserData();
      },
    },
    mounted() {
      this.update();
    },
  };
</script>

<style scoped>
  .container {
    overflow: auto;
    padding: 10px 10px 30px 10px;
    min-height: 100vh;
  }
</style>
