<template>
  <div class="content-preview">
    <card class="content-preview-card">
      <div class="text-container">
        <p class="title">{{contentTitle}}</p>
        <p class="explain">{{contentExplainEllipis}}</p>
      </div>
      <div class="actions">
        <floating-button><img @click="modifyContent(contentNo)" class="icon edit" src="../../public/icon/edit.svg" alt="edit"></floating-button>
        <floating-button><img @click="onDeleteContent(contentNo)" class="icon delete" src="../../public/icon/delete.svg" alt="delete"></floating-button>
      </div>
    </card>
  </div>
</template>

<script>
  import { stringEllipsis } from '../utils';
  import { deleteMeditation } from '../lib/content';
  import Card from './inheart-ui/card';
  import FloatingButton from './inheart-ui/floatingButton';

  export default {
    name: 'content-preview-card',
    components: {
      FloatingButton,
      Card
    },
    props: ['contentNo', 'contentTitle', 'contentExplain'],
    computed: {
      contentExplainEllipis() {
        return stringEllipsis(this.contentExplain, 18);
      },
    },
    methods: {
      modifyContent(id) {
        this.$router.push(`edit-meditation?meditationNo=${id}`);
      },
      async onDeleteContent() {
        // eslint-disable-next-line
        if (confirm('컨텐츠를 삭제하시겠습니까?')) {
          try {
            await deleteMeditation({ meditationNo: this.contentNo });
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
  .content-preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-preview-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    margin: 20px 20px 0;
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

  .floating-button {
    margin-right: 10px;
  }

  .floating-button img {
    padding: 5px;
  }

  .icon {
    width: 28px;
    height: 28px;
  }

</style>
