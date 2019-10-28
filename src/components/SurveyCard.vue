<template>
  <card class="survey-card">
    <div class="content">
      <span class="index">{{index}}</span>
      <editable-component v-model="localTitle" :isEditable="isEditable" :value="localTitle"/>
    </div>
    <floating-button style="margin-left: 10px;"><img @click="changeEditable(!isEditable)"
                                                     :src="!isEditable?`/icon/edit.svg`:`/icon/disturb.svg`" alt="edit"></floating-button>
    <floating-button v-show="isEditable"><img @click="onModifySurvey" src="../../public/icon/check.svg" alt="check"></floating-button>
  </card>
</template>

<script>
  import EditableComponent from './EditableComponent.vue';
  import { modifySurvey } from '../lib/survey';
  import Card from './inheart-ui/card';
  import FloatingButton from './inheart-ui/floatingButton';

  export default {
    name: 'survey-card',
    components: {
      FloatingButton,
      Card,
      EditableComponent
    },
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
        if (confirm('게시물을 수정하시겠습니까?')) {
          try {
            await modifySurvey({
              title: this.localTitle,
              index: this.index
            });
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
    height: auto;
    display: flex;
    flex-direction: row;
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

  .floating-button {
    margin-right: 10px;
    transition: all .4s ease-in-out;
  }

  .floating-button img {
    padding: 5px;
    transition: all .4s ease-in-out;
  }
</style>
