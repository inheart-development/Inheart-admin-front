<template>
  <div class="survey-card">
    <div class="content-wrapper">
      <div class="content">
        <span class="prefix">Q.</span>
        <editable-component v-model="localQuestion" :isEditable="isEditable" />
      </div>
      <div class="content answer-content">
        <span class="prefix">A.</span>
        <editable-component v-model="localAnswer" :isEditable="isEditable" />
      </div>
      <div class="button-wrapper">
        <img
          class="icon edit-icon"
          src="../assets/ic_edit.png"
          alt="edit"
          @click="changeEditable(!isEditable)"
        >
        <img
          class="icon check-icon"
          src="../assets/ic_check.png"
          alt="check"
          v-show="isEditable"
          @click="onClickCheck"
        >
      </div>
    </div>
    <img
      class="icon delete-icon"
      src="../assets/ic_delete.png"
      alt="delete"
      @click="deleteFaqItem"
    />
  </div>
</template>

<script>
import EditableComponent from './EditableComponent.vue';
import { modifyFaq, deleteFaq } from '../lib/faq';

export default {
  name: 'survey-card',
  props: ['question', 'answer', 'index'],
  components: { EditableComponent },
  data() {
    return {
      isEditable: false,
      localQuestion: '',
      localAnswer: '',
    };
  },
  methods: {
    changeEditable(value) {
      this.isEditable = value;
    },
    async deleteFaqItem() {
      // eslint-disable-next-line
      if(confirm('게시글을 삭제하시겠습니까?')) {
        try {
          await deleteFaq({
            index: this.index,
          });
          // eslint-disable-next-line
          alert('faq 삭제!');
          this.$emit('update');
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    },
    async modifyFaqItem() {
      // eslint-disable-next-line
      if(confirm('게시글을 수정하시겠습니까?')) {
        try {
          await modifyFaq({
            question: this.localQuestion,
            answer: this.localAnswer,
            index: this.index,
          });
          this.$emit('update');
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    },
    onClickCheck() {
      this.changeEditable(false);
      this.modifyFaqItem();
    },
  },
  created() {
    this.localQuestion = this.question;
    this.localAnswer = this.answer;
  },
  mounted() {
  },
};
</script>

<style scoped>
.survey-card {
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 1em 1em;
  align-items: center;
  border-radius: 4px;
}

.content-wrapper {
  flex: 1;
}

.content {
  display: grid;
  grid-template-columns: 1em auto;
  grid-gap: 1em;
}

.answer-content {
  margin-top: 1em;
}

.prefix {
  display: inline-block;
  width: 1em;
  padding-top: 0.5em;
}

.question, .answer {
  flex: 1;
  float: right;
  word-wrap: break-word;
  word-break: break-all;
  resize: none;
  height: auto;
}

.question.isEditable, .answer.isEditable {
  outline: 1px solid black;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
}

.icon {
  width: 2em;
  height: 2em;
}

.delete-icon {
  align-self: flex-start;
}
</style>
