<template>
  <card class="survey-card">
    <div class="content-wrapper">
      <div class="content">
        <span class="prefix">Q.</span>
        <editable-component v-model="localQuestion" :isEditable="false"/>
      </div>
      <div class="content answer-content">
        <span class="prefix">A.</span>
        <editable-component v-model="localAnswer" :isEditable="false"/>
      </div>
      <div class="button-wrapper">
        <floating-button>
          <img
            @click="onClickEdit(faqNo)"
            src="/admin/icon/edit.svg"
            alt="edit"
          >
        </floating-button>
        <floating-button>
          <img @click="deleteFaqItem(faqNo)" src="../../public/icon/delete.svg" alt="delete">
        </floating-button>
      </div>
    </div>
  </card>
</template>

<script>
  import EditableComponent from './EditableComponent.vue';
  import {modifyFaq, deleteFaq} from '../lib/faq';
  import Card from './inheart-ui/card';
  import FloatingButton from './inheart-ui/floatingButton';

  export default {
    name: 'faq-card',
    props: ['question', 'answer', 'faqNo'],
    components: {
      FloatingButton,
      Card,
      EditableComponent
    },
    data() {
      return {
        localQuestion: '',
        localAnswer: '',
      };
    },
    methods: {
      async deleteFaqItem(index) {
        // eslint-disable-next-line
        if (confirm('게시글을 삭제하시겠습니까?')) {
          try {
            await deleteFaq(index);
            // eslint-disable-next-line
            alert('faq 삭제!');
            this.$emit('update');
          } catch (e) {
            // eslint-disable-next-line
            console.log(e);
          }
        }
      },
      onClickEdit(id) {
        this.$router.push(`edit-faq?faqNo=${id}`)
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
    height: auto;
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

  .delete-icon {
    align-self: flex-start;
  }

  .floating-button {
    margin-right: 10px;
  }

  .floating-button img {
    padding: 5px;
  }

</style>
