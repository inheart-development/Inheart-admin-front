<template>
  <div class="content-preview-card">
    <div class="text-container">
      <p class="title">{{contentTitle}}</p>
      <p class="explain">{{contentExplainEllipis}}</p>
    </div>
    <img @click="modifyContent" class="icon edit" src="../assets/ic_edit.png" alt="edit">
    <img @click="onDeleteContent" class="icon delete" src="../assets/ic_delete.png" alt="delete">
  </div>
</template>

<script>
import { stringEllipsis } from '../utils';
import { deleteContent } from '../lib/content';

export default {
  name: 'content-preview-card',
  props: ['contentNo', 'contentTitle', 'contentExplain'],
  computed: {
    contentExplainEllipis() {
      return stringEllipsis(this.contentExplain, 18);
    },
  },
  methods: {
    modifyContent() {
      this.$emit('modify-content', this.contentNo);
    },
    async onDeleteContent() {
      // eslint-disable-next-line
      if(confirm('컨텐츠를 삭제하시겠습니까?')) {
        try {
          await deleteContent({ contentsNo: this.contentNo });
          this.$emit('update');
          // eslint-disable-next-line
          alert('컨텐츠가 삭제되었습니다.');
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
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
