<template>
  <div :style="layout_style" class="middle-nav">
    <div class="middle-nav-item"
         @click="changeCategory(index)"
         v-for="(category,index) in categories"
         :style="categoryStyle[index]"
         :key="index">
      <span>{{category.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "navigation",
    props: ['categories', 'item_style', 'layout_style'],
    data() {
      return {
        selected_category: 0,
        categoryStyle: []
      }
    },
    methods: {
      changeCategory(index) {
        this.selected_category = index;
        this.categoryStyle = this.categories.map((v, index) => {
          const background = index === this.selected_category ? this.categories[index].color : 'white';
          if (index === this.selected_category) {
            return Object.assign({
              border: `2px solid ${this.categories[index].color}`, background, color: 'white', boxShadow: '0 3px 10px 0 rgba(0, 0, 0, .5)'
            }, this.item_style ? this.item_style : {})
          } else {
            return Object.assign(
              {border: `2px solid ${this.categories[index].color}`, background, color: '#3c4043'},
              this.item_style ? this.item_style : {});
          }
        });
        this.$emit('change', index);
      },
    }, mounted() {
      this.changeCategory(0);
    }
  }
</script>

<style scoped>
  .middle-nav {
    user-select: none;
    max-width: 600px;
    width: 90vw;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px auto 10px auto;
  }

  .middle-nav-item:nth-child(1) {
    margin-left: 0;
  }

  .middle-nav-item {
    padding: 5px 10px;
    border-radius: 15px;
    transition: all .4s ease-in-out;
    font-weight: 300;
    color: white;
    font-size: 1rem;
    margin-left: 10px;
    text-align: center;
    box-shadow: 0 5px 12px -3px rgba(85, 103, 134, 0.35);
  }
</style>
