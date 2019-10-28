<template>
  <div class="page-header">
    <card class="header-card">
      <h2 class="page-title">{{title}}</h2>
    </card>
  </div>
</template>

<script>
  import Card from './inheart-ui/card';

  export default {
    name: 'page-header',
    components: { Card },
    props: ['title'],
    methods: {
    },
  };
</script>

<style scoped>
  .page-header {
    display: flex;
    align-items: center;
    padding: 1em 1em;
  }

  .menu-icon {
    width: 2em;
    height: 2em;
    cursor: pointer;
  }

  .page-title {
    flex: 1;
    text-align: center;
    margin: 0;
  }

  .header-card {
    display: flex;
    height: 60px;
    font-size: 20px;
  }
</style>
