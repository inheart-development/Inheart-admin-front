<template>
  <div class="navigation">
    <div class="logo-wrapper">
      <img class="logo" src="../assets/admin_logo.png" alt="logo" />
      <p>Inheart 관리자</p>
    </div>
    <div>
      <ul>
        <li v-for="(link, index) in links" :key="index" :class="$route.path === `/${link.route}` ? 'active' : null">
          <router-link :to="link.route" class="navigator">
            {{link.name}}
          </router-link>
          <img src="../assets/ic_keyboard_arrow_right.png" alt="arrow_right">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'navigation',
  props: [],
  data() {
    return {
      links: [
        {
          name: '통계',
          route: 'statistics'
        },
        {
          name: '명상 컨텐츠 관리',
          route: 'content'
        },
        {
          name: '명상 설문 관리',
          route: 'survey'
        },
        {
          name: 'FAQ 게시글 관리',
          route: 'faq'
        },
      ],
    };
  },
  methods: {
  },
  created() {
  },
  mounted() {
  },
};
</script>

<style scoped>
.navigation {
  width: 250px;
  background: #393c65;
  color: #fff;
  padding: 0 20px;
}

.logo-wrapper {
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.logo {
  height: 40px;
}

li {
  height: 45px;
  display: flex;
  align-items: center;
  list-style-type: none;
  position: relative;
  opacity: 0.7;
}

li.active, li:hover {
  opacity: 1;
}

li > img {
  position: absolute;
  right: 0;
}

a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  opacity: 1;
}

</style>
