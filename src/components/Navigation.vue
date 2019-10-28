<template>
  <div class="navigation">
    <div>
      <img src="" alt="logo" />
    </div>
    <div>
      <ul>
        <li v-for="(link, index) in links" :key="index">
          <router-link :to="link.route" class="navigator">
            {{link.name}}
          </router-link>
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
      ]
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
}

li {
  list-style-type: none;
}

a {
  color: #fff;
  text-decoration: none;
}
</style>
