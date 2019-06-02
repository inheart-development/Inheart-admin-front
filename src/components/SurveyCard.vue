<template>
  <div class="survey-card">
    <div class="content">
      <span class="index">{{index}}</span>
      <span class="title" :class="{isEditable}" :contenteditable="isEditable">{{title}}</span>
    </div>
    <img
      class="icon"
      @click="changeEditable(true)"
      src="../assets/ic_edit.png"
      alt="edit"
    >
    <img
      class="icon"
      @click="changeEditable(false)"
      v-show="isEditable"
      src="../assets/ic_check.png"
      alt="check"
    >
  </div>
</template>

<script>
export default {
  name: 'survey-card',
  props: ['title', 'index'],
  data() {
    return {
      isEditable: false,
    };
  },
  methods: {
    changeEditable(value) {
      this.isEditable = value;
    },
  },
};
</script>

<style scoped>
.survey-card {
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 0.5em 1em;
  align-items: center;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
}

.index {
  margin-right: 1em;
}

.title {
  flex: 1;
  max-width: 300px;
  word-break: break-all;
}

.title.isEditable {
  border: 1px solid black;
}

.icon {
  width: 2em;
  height: 2em;
}
</style>
