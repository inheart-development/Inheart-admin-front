<template>
  <div @keypress="validatePressEnterkey" class="content-detail-viewer">
    <div class="content-detail-container">
      <img class="close-icon" @click="onCloseViewer" src="../assets/ic_clear.png" alt="clear">
      <h2 class="title">명상 컨텐츠</h2>
      <select v-model="selected">
        <option id="category-option" value="카테고리" disabled>카테고리</option>
        <option :value=1>머리비우기</option>
        <option :value=2>마음비우기</option>
        <option :value=3>마음채우기</option>
        <option :value=4>글명상</option>
        <option :value=5>자유명상</option>
      </select>
      <input type="text" v-model="title" placeholder="글 제목" />
      <input type="text" v-model="explain" placeholder="글 설명"/>
      <input type="file" ref="content" @change="handleFileUpload(setContent, 'content')"/>
      <img class="preview" v-if="coverImageUrl !== '' && selected !== 4" :src="coverImageUrl" />
      <div class="preview" v-if="coverImageUrl === '' && selected !== 4">미리보기</div>
      <input
        v-if="selected !== 4"
        type="file"
        ref="cover"
        @change="handleFileUpload(setCover, 'cover')"

      />
      <div @click="onSavePost" class="upload">업로드</div>
    </div>
  </div>
</template>

<script>
import { postNewContent, modifyContent } from '../lib/content';

export default {
  name: 'content-detail-viewer',
  props: ['postType', 'detailPost'],
  data() {
    return {
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
        await postNewContent({ formData: form, contentType });
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
        await modifyContent({ formData: form, contentType });
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
.content-detail-viewer {
  width:90vw;
  height: 90vh;
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
  height: 100%;
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
  margin: 0;
  margin-top: 2rem;
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
}

.upload {
  position: absolute;
  bottom: 1em;
  width: calc(100% - 2em);
  text-align: center;
  background: #f0f0f0;
  padding: 0.5em 0;
  box-sizing: border-box;
}
</style>
