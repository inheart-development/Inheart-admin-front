<template>
  <modal>
    <div>
      <card id="inner-space" class="notice-content-wrapper">
        <h2 class="title">앨범</h2>
        <div class="input-item">
          <label class="custom-label login-label" for="title">제목</label>
          <p id="title">{{title}}</p>
        </div>
        <div class="input-item">
          <label class="custom-label login-label" for="content">내용</label>
          <div id="content">
						<p v-for="(p, i) in content.split('\n')" :key="i">{{p}}</p>
					</div>
        </div>
				<div class="album-container">
					<card
						class="album-card custom-card"
						v-for="meditation in meditations"
						:key="meditation.id"
					>
						<div class="album-card-description">
							<p>{{meditation.title}}</p>
							<p>{{meditation.content}}</p>
						</div>
						<img class="album-card-cover" :src="meditation.cover" alt="커버 이미지">
					</card>
				</div>
      </card>
      <div class="button-container">
        <div class="btn-card-container">
          <card class="btn-card" @click="onModifyAlbum">수정하기</card>
        </div>
        <div class="btn-card-container">
          <card class="btn-card" @click="onCloseViewer">닫기</card>
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
    name: 'notice-viewer',
    components: {
      Card,
      Modal,
    },
    props: [],
    data() {
      return {
        title: '제목',
				content: '내용 dasdas\n dsad\n sdas',
				id: '',
				meditations: [
					{
						id : 1,
						title : "명상제목",
						tags : [ "tag1", "tag2" ],
						content : "설명",
						time : "00:40:17",
						cover : "이미지 경로"
					},
					{
						id : 2,
						title : "명상제목2",
						tags : [ "tag1", "tag2" ],
						content : "설명",
						time : "00:40:17",
						cover : "이미지 경로"
					},
					{
						id : 3,
						title : "명상제목2",
						tags : [ "tag1", "tag2" ],
						content : "설명",
						time : "00:40:17",
						cover : "이미지 경로"
					}
				]
      };
    },
    methods: {
      onCloseViewer() {
        this.$emit('close-viewer');
			},
			onModifyAlbum() {
				this.$emit('modify-album');
			}
    },
  };
</script>

<style scoped>
  .btn-card-container {
    width: 280px;
  }
  .title {
    text-align: center;
    margin-bottom: 1rem;
  }
  .button-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 600px;
  }

  .notice-content-wrapper {
    margin-top: 0;
    height: auto;
    max-height: 80vh;
    overflow: auto;
    display: block;
  }

  .btn-card {
    height: 60px;
    font-size: 20px;
    cursor: pointer;
    width: 100%;
  }

  .input-item {
    width: 100%;
    margin: 15px 15px 15px 0;
  }

  label {
    font-weight: 500;
    display: block;
    font-size: 18px;
		margin-bottom: 10px;
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

	.album-container {
	}

	.album-card {
		justify-content: flex-start;
		position: relative;
		height: 90px;
		width: auto;
	}

	.album-card-cover {
		position: absolute;
		right: 20px;
		width: 50px;
		height: 50px;
	}
  .custom-card {
    box-shadow: none;
    border: 1px solid rgba(85,103,134,0.35);;
  }
  
</style>
