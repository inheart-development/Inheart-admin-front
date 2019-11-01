<template>
  <div class="container">
		<div>
			<page-header title="앨범 관리"/>
      <router-link to="edit-album">
			  <card class="add-btn">
          추가하기
			  </card>
      </router-link>
        <card
          v-for="album in albums"
          :key="album.albumNo"
          class="album-card"
        >
        <div class="album-description">
          <p class="title">{{album.albumTitle}}</p>
          <p>{{album.albumExplain}}</p>
        </div>
        <div class="button-container">
          <floating-button @click="changeAlbumRecommend($event, album.albumNo, album.isRecommend)">
            <img
              class="star"
              :src="album.isRecommend ? require('../assets/ic_outline_star_white.png') : require('../assets/ic_outline_star_border_white.png')"
              alt="star"
            >
          </floating-button>
          <floating-button @click="editAlbum(album.albumNo)">
            <img
              class="delete"
              src="../../public/icon/edit.svg"
              alt="delete"
            >
          </floating-button>
          <floating-button @click="updateDeleteAlbum($event, album.albumNo)">
            <img
              class="delete"
              src="../../public/icon/delete.svg"
              alt="delete"
            >
          </floating-button>
        </div>
      </card>
		</div>
		<album-editor
			v-if="isEditorOpened"
			@close-editor="closeEditor"
			:isOnModifying="isOnModifying"
		/>
		<album-viewer v-if="isViewerOpened" @close-viewer="closeViewer" @modify-album="modifyAlbum" />
  </div>
</template>

<script>
  import Card from '../components/inheart-ui/card';
  import FloatingButton from '../components/inheart-ui/floatingButton';
	import PageHeader from '../components/PageHeader';
	import AlbumEditor from '../components/AlbumEditor';
  import AlbumViewer from '../components/AlbumViewer';
  import { deleteAlbum, getAlbums, addRecommmendAlbum, deleteRecommmendAlbum } from '../lib/album'

	export default {
    name: 'album',
		components: { Card, PageHeader, AlbumEditor, AlbumViewer, FloatingButton },
		data() {
			return {
				albums: null,
				isEditorOpened: false,
				isViewerOpened: false,
        isOnModifying: false,
			}
		},
		methods: {
      editAlbum(id) {
        this.$router.push(`edit-album?albumNo=${id}`);
      },
      async updateGetAlbums() {
        const response = await getAlbums();
        const { data } = response;
        this.albums = data.data;
      },
      async updateDeleteAlbum(e, id) {
        e.preventDefault();
        await deleteAlbum(id);
        await this.updateGetAlbums();
      },
      async changeAlbumRecommend(e, id, isRecommend) {
        e.preventDefault();
        if(isRecommend) await deleteRecommmendAlbum(id);
        else await addRecommmendAlbum(id);
        await this.updateGetAlbums();
      }
    },
    mounted() {
      this.updateGetAlbums();
    },
  };
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: auto;
  padding-bottom: 20px;
}

.album-card {
	min-height: 100px;
	height: auto;
	display: flex;
  justify-content: flex-start;
  position: relative;
  align-items: center;
}

.button-container {
  position: absolute;
  right: 20px;
}

.button-container > * {
  margin-right: 10px;
}

.album-description {
  color: #000;
}

.album-description .title {
  font-weight: bold;
  margin-bottom: 0.6em;
}

.add-btn {
  height: 70px;
  font-size: 20px;
  cursor: pointer;
}
</style>
