<template>
  <div class="content-preview-card">
    <div class="text-container">
      <p class="title">{{contentTitle}}</p>
      <p class="explain">{{contentExplainEllipis}}</p>
    </div>
    <img class="icon edit" src="../assets/ic_edit.png" alt="edit">
    <img class="icon delete" src="../assets/ic_delete.png" alt="delete">
  </div>
</template>

<script>
import { stringEllipsis } from '../utils';

export default {
  name: 'content-preview-card',
  props: ['contentNo', 'contentTitle', 'contentExplain'],
  computed: {
    contentExplainEllipis() {
      return stringEllipsis(this.contentExplain, 5);
    },
  },
};
</script>

<style scoped>
.content-preview-card {
  display: flex;
  align-items: center;
  padding: 0.6em;
  background: #fff;
  border-radius: 4px;
}

.text-container {
  flex: 1;
}

.title {
  margin: 0;
}

.explain {
  margin: 0;
  margin-top: 0.5em;
}

.icon {
  width: 1.5em;
  height: 1.5em;
}
.edit {
  margin-right: 5px;
}
</style>
