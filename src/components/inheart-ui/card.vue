<template>
  <div :style="themeStyle" class="card flex-center">
    <!--    <div class="inner-container flex-center">-->
    <slot></slot>
    <!--    </div>-->
  </div>
</template>

<script>
  export default {
    name: "card",
    data() {
      return {
        themeStyle: {}
      };
    }, created() {
      // setTimeout(() => {
      //   window.$cardThemeQue.push(this);
      //   window.$boxShadow.push(this);
      //   const isLight = window.$theme === 'light';
      //   this.$set(this.themeStyle, 'background', isLight ? '#fff' : '#212529');
      //   this.$set(this.themeStyle, 'color', isLight ? '#343a40' : '#f8f9fa');
      //   this.$set(this.themeStyle, 'boxShadow', isLight ? '0 5px 12px -3px rgba(85, 103, 134, 0.35)' : '0 5px 10px 0 rgba(0, 0, 0, .5)');
      //
      // }, 100);
    }
  }
</script>

<style scoped>
  .card {
    padding: 20px;
    background: #fff;
    height: 200px;
    margin: 20px auto 0;
    width: 600px;
    max-width: calc(100vw - 60px);
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 12px -3px rgba(85, 103, 134, 0.35);
    transition: all .4s ease-in-out;
    display: flex;
    border-radius: 8px;
    animation: show .5s;
  }

  .title > h1 {
    color: #6D6E72;
    font-size: 2.5rem;
    font-weight: 100;
    text-align: center;
  }
</style>
