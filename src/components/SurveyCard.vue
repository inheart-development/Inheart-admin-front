<template>
  <div class="survey-card">
    <div class="content">
      <span class="index">{{index}}</span>
      <editable-component v-model="localTitle" :isEditable="isEditable" :value="localTitle" />
    </div>
    <img
      class="icon"
      @click="changeEditable(true)"
      src="../assets/ic_edit.png"
      alt="edit"
    >
    <img
      class="icon"
      @click="onModifySurvey"
      v-show="isEditable"
      src="../assets/ic_check.png"
      alt="check"
    >
  </div>
</template>

<script>
import EditableComponent from './EditableComponent.vue';
import { modifySurvey } from '../lib/survey';

export default {
  name: 'survey-card',
  components: { EditableComponent },
  props: ['title', 'index'],
  data() {
    return {
      isEditable: false,
      localTitle: '',
    };
  },
  methods: {
    changeEditable(value) {
      this.isEditable = value;
    },
    async onModifySurvey() {
      // eslint-disable-next-line
      if(confirm('게시물을 수정하시겠습니까?')) {
        try {
          await modifySurvey({ title: this.localTitle, index: this.index });
          // eslint-disable-next-line
          alert('게시물이 수정되었습니다.');
          this.$emit('update');
          this.changeEditable(false);
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
          // eslint-disable-next-line
          alert('게시물이 수정되지 않았습니다.');
        }
      } else {
        this.localTitle = this.title;
        this.changeEditable(false);
        // eslint-disable-next-line
        alert('게시물이 수정이 취소되었습니다.');
      }
    },
  },
  created() {
    this.localTitle = this.title;
  },
};
</script>

<style scoped>
.survey-card {
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 0.8em 1em;
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
  width: 1.5em;
  height: 1.5em;
}
</style>
