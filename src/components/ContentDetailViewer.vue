<template>
  <modal :is_open="isOpen">
    <div @keypress="validatePressEnterkey">
      <card class="auto-height">
        <div class="flex-center">
          <div class="input-container">
            <div class="flex-clear">
              <h2 class="title">명상 컨텐츠</h2>
              <div class="input-item">
                <label class="custom-label login-label" for="title">카테고리</label>
              </div>
              <select v-model="selected">
                <option id="category-option" value="카테고리" disabled>카테고리</option>
                <option :value=1>머리비우기</option>
                <option :value=2>마음비우기</option>
                <option :value=3>마음채우기</option>
                <option :value=4>글명상</option>
                <option :value=5>자유명상</option>
              </select>
              <div class="input-item">
                <label class="custom-label login-label" for="title">제목</label>
                <input
                  class="custom-input"
                  id="title"
                  placeholder="제목"
                  type="text"
                  v-model="title"
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
                >
              </div>
              <label class="custom-label login-label" for="audio">오디오</label>
              <input type="file" ref="content" @change="handleFileUpload(setContent, 'content')" id="audio"/>
              <label class="custom-label login-label" for="cover">커버이미지</label>
              <input
                v-if="selected !== 4"
                type="file"
                ref="cover"
                id="cover"
                @change="handleFileUpload(setCover, 'cover')"
              />
              <img class="preview" v-if="coverImageUrl !== '' && selected !== 4" :src="coverImageUrl"/>
              <div class="preview" v-if="coverImageUrl === '' && selected !== 4">미리보기</div>
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

  export default {
    name: 'content-detail-viewer',
    components: {
      Card,
      Modal
    },
    props: ['postType', 'detailPost'],
    data() {
      return {
        isOpen: true,
        selected: '카테고리',
        title: '',
        explain: '',
        audio: '',
        coverImage: '',
        coverImageUrl: '',
        text: '',
        id: '',
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
      async onSavePost() {
        if (this.postType === 'create') {
          await this.onCreateContent();
          this.onCloseViewer();
        } else {
          await this.onModifyContent();
          this.onCloseViewer();
        }
      },
      async onCreateContent() {
        try {
          const form = new FormData();
          const contentType = this.selected !== 4 ? 'sound' : 'text';
          form.append('categoryNo', this.selected);
          form.append('contentsTitle', this.title);
          form.append('contentsExplain', this.explain);
          form.append('contentsType', contentType);
          if (this.selected !== 4) {
            form.append('cover', this.coverImage);
            form.append('sound', this.audio);
          } else {
            form.append('text', this.text);
          }
          await postNewContent({
            formData: form,
            contentType
          });
          this.$emit('update');
          // eslint-disable-next-line
          alert('컨텐츠가 생성되었습니다.');
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      },
      async onModifyContent() {
        try {
          const form = new FormData();
          const contentType = this.selected !== 4 ? 'sound' : 'text';
          console.log(contentType);
          form.append('contentsNo', this.id);
          form.append('categoryNo', this.selected);
          form.append('contentsTitle', this.title);
          form.append('contentsExplain', this.explain);
          form.append('contentsType', contentType);
          if (this.selected !== 4) {
            form.append('cover', this.coverImage);
            form.append('sound', this.audio);
          } else {
            form.append('text', this.text);
          }
          await modifyContent({
            formData: form,
            contentType
          });
          this.$emit('update');
          // eslint-disable-next-line
          alert('컨텐츠가 수정되었습니다.');
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      },
      validatePressEnterkey(e) {
        if (e.keyCode === 13) {
          this.onSavePost();
        }
      },
    },
    watch: {
      detailPost: {
        handler(newValue) {
          const {
            categoryNo,
            contentsTitle,
            contentsExplain,
            contents,
            contentsNo,
          } = newValue;
          this.selected = categoryNo;
          this.title = contentsTitle;
          this.explain = contentsExplain;
          this.audio = contents;
          this.id = contentsNo;
        },
      },
    },
    mounted() {
      if (this.postType === 'modify') {
        const {
          categoryNo, contentsTitle, contentsExplain, contents, contentsNo,
        } = this.detailPost;
        this.selected = categoryNo;
        this.title = contentsTitle;
        this.explain = contentsExplain;
        this.audio = contents;
        this.id = contentsNo;
      }
    },
    // updated() {
    //   if (this.postType === 'modify' && this.detailPost.contentsNo !== this.id) {
    //     console.log('update');
    //     const {
    //       categoryNo, contentsTitle, contentsExplain, contents, contentsNo,
    //     } = this.detailPost;
    //     this.selected = categoryNo;
    //     this.title = contentsTitle;
    //     this.explain = contentsExplain;
    //     this.audio = contents;
    //     this.id = contentsNo;
    //   }
    // },
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
    max-width: calc(100vw - 40px);
  }

  .auto-height {
    height: auto;
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
    margin: 1rem 0;
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
    margin-top: 10px;
  }

  .btn-card {
    height: 70px;
    font-size: 20px;
    cursor: pointer;
    width: 100%;
    max-width: calc((100vw - 60px) / 2 - 10px);
  }

  input {
    font-family: 'SpoqaHanSans', 'Spoqa Han Sans', sans-serif;
  }

  .input-container {
    width: 300px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sign-up {
    margin: 10px 0;
    font-weight: 300;
    font-size: 18px;
  }

  .container {
    height: 100vh;
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
</style>
