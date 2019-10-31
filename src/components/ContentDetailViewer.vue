<template>
  <modal :is_open="isOpen">
    <div @keypress="validatePressEnterkey">
      <card id="inner-space" class="detail-viewer-card">
        <div>
          <div class="input-container">
            <div class="flex-clear">
              <h2 class="title">명상 컨텐츠</h2>
              <div class="input-item">
                <label class="custom-label login-label" for="tag">태그</label>
                <tag-button-editor @createTag="createTag" @deleteTag="deleteTag" @changeTag="changeNewTag" :newTag="newTag" :tags="tags" />
              </div>
              <div class="input-item">
                <label class="custom-label login-label" for="title">제목</label>
                <input
                  class="custom-input"
                  id="title"
                  placeholder="제목"
                  type="text"
                  v-model="title"
                  autocomplete="off"
                >
              </div>
              <div class="input-item">
                <label class="custom-label login-label" for="explain">설명</label>
                <input
                  class="custom-input"
                  id="explain"
                  placeholder="설명"
                  type="text"
                  v-model="explain"
                  autocomplete="off"
                >
              </div>
              <div class="input-item">
                <label class="custom-label login-label" for="audio">오디오</label>
                <input type="file" ref="content" @change="handleFileUpload(setContent, 'content')" id="audio"/>
              </div>
              <div class="input-item">
                <label class="custom-label login-label" for="cover">커버이미지</label>
                <input
                  type="file"
                  ref="cover"
                  id="cover"
                  @change="handleFileUpload(setCover, 'cover')"
                />
              </div>
              <div class="preview" v-if="coverImageUrl === ''">미리보기</div>
            </div>
          </div>
        </div>
      </card>
      <div class="button-container">
        <div class="btn-card-container" @click="onSavePost">
          <card class="btn-card"> 업로드</card>
        </div>
        <div class="btn-card-container" @click="onCloseViewer">
          <card class="btn-card">닫기</card>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
  import { postNewContent, modifyContent } from '../lib/content';
  import Modal from './inheart-ui/modal';
  import Card from './inheart-ui/card';
  import ButtonList from './inheart-ui/button-list';
  import TagButtonEditor from './TagButtonEditor';

  export default {
    name: 'content-detail-viewer',
    components: {
      Card,
      Modal,
      ButtonList,
      TagButtonEditor
    },
    props: ['postType', 'id'],
    data() {
      return {
        isOpen: true,
        title: '',
        explain: '',
        audio: '',
        coverImage: '',
        coverImageUrl: '',
        text: '',
        tags: [],
        newTag: '',
      };
    },
    methods: {
      handleFileUpload(setFunc, refName) {
        switch (refName) {
        default:
          // eslint-disable-next-line
          let file;
          break;
        case 'content':
          // eslint-disable-next-line
          file = this.$refs[refName].files[0];
          setFunc(file);
          break;
        case 'cover':
          // eslint-disable-next-line
          file = this.$refs[refName].files[0];
          // eslint-disable-next-line
          const url = URL.createObjectURL(file);
          setFunc(file, url);
          break;
        }
        // this.audio = this.$refs.audio.files[0];
        // this.coverImageUrl = URL.createObjectURL(this.audio);
      },
      setContent(file) {
        if (this.selected !== 4) {
          this.audio = file;
        } else {
          this.text = file;
        }
      },
      setCover(file, url) {
        this.coverImage = file;
        this.coverImageUrl = url;
      },
      onCloseViewer() {
        this.$emit('close-viewer');
        this.isOpen = false;
      },
      deleteTag(index) {
        const temp = [...this.tags];
        temp.splice(index, 1);
        this.tags = temp;
      },
      createTag(tag) {
        this.tags = [...this.tags, tag];
      },
      changeNewTag(newVal) {
        this.newTag = newVal;
      },
      async onSavePost() {
        if (this.postType === 'create') {
          await this.onCreateContent();
          this.onCloseViewer();
        } else {
          await this.onModifyContent();
          this.onCloseViewer();
        }
      },
      validatePressEnterkey(e) {
        if (e.keyCode === 13) {
          this.onSavePost();
        }
      },
    },
    watch: {
    },
    mounted() {
    },
  };
</script>

<style scoped>
  .btn-card-container {
    width: 280px;
  }

  .button-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 600px;
  }

  .detail-viewer-card {
    margin-top: 0;
    height: auto;
    max-height: 80vh;
    overflow: auto;
    display: block;
  }

  .content-detail-viewer {
    width: 90vw;
    max-width: 600px;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -45vw;
    margin-top: -45vh;
    z-index: 2;
    box-sizing: border-box;
  }

  .content-detail-container {
    position: relative;
    padding: 1em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .close-icon {
    width: 1.5em;
    height: 1.5em;
    position: absolute;
    top: 1em;
    right: 1em;
  }

  .title {
    text-align: center;
    margin-bottom: 1rem;
  }

  #category-option {
    display: none;
  }

  .preview {
    width: 300px;
    height: 300px;
    align-self: center;
    background: #f0f0f0;
    text-align: center;
    line-height: 300px;
    margin: 10px auto 0;
  }

  .btn-card {
    height: 60px;
    font-size: 20px;
    cursor: pointer;
    width: 100%;
  }

  input {
    font-family: 'SpoqaHanSans', 'Spoqa Han Sans', sans-serif;
  }

  .sign-up {
    margin: 10px 0;
    font-weight: 300;
    font-size: 18px;
  }

  .custom-button {
    border: 2px solid #e1b52f;
    border-radius: 500px;
    padding: 10px;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .custom-input {
    border: 0;
    border-bottom: 1px solid #6d6e72;
    background: none;
    font-size: 1rem;
    padding: 5px;
    width: 100%;
    font-weight: 300;
  }

  .warn-label {
    color: red;
    margin-top: 4px;
    font-size: 0.85rem;
  }

  .file-selector {
    display: inline-block;
    padding: 5px;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
    border-bottom: 1px solid #6d6e72;
    width: 100%;
  }

  input[type="file"] {
    margin: 10px auto;
  }

  .input-item {
    width: 100%;
    margin: 15px 15px 15px 0;
  }

  select {
    font-size: 1rem;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #6d6e72;
  }

  label {
    font-weight: 500;
    display: block;
    font-size: 18px;
  }
  .add-btn {
    margin-top: 0;
  }
</style>
