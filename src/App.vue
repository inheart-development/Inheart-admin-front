<template>
  <div id="app">
    <navigation/>
    <div class="page-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: { navigation },
}
</script>

<style>
  body {
    margin: 0;
  }

#app {
  display: flex;
}

.page-wrapper {
  flex: 1;
}
</style>
