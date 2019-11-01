<template>
  <div class="container">
		<div>
			<page-header title="앨범 관리"/>
      <router-link to="edit-album">
			  <card class="add-btn">
          추가하기
			  </card>
      </router-link>
			<router-link 
        :to="`edit-album?albumNo=${album.albumNo}`"
        v-for="album in albums"
				:key="album.albumNo"
      >
        <card
          class="album-card"
        >
          <div class="album-description">
            <p class="title">{{album.albumTitle}}</p>
            <p>{{album.albumExplain}}</p>
          </div>
          <img
            class="star"
            :src="album.isRecommend ? require('../assets/ic_star.svg') : require('../assets/ic_star_border.svg')"
            alt="star"
            @click="changeAlbumRecommend($event, album.albumNo, album.isRecommend)"
          >
          <img
            class="delete"
            src="../assets/ic_delete.png"
            alt="delete"
            @click="updateDeleteAlbum($event, album.albumNo)"
          >
        </card>
      </router-link>
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
	import PageHeader from '../components/PageHeader';
	import AlbumEditor from '../components/AlbumEditor';
  import AlbumViewer from '../components/AlbumViewer';
  import { deleteAlbum, getAlbums, addRecommmendAlbum, deleteRecommmendAlbum } from '../lib/album'

	export default {
    name: 'album',
		components: { Card, PageHeader, AlbumEditor, AlbumViewer },
		data() {
			return {
				albums: null,
				isEditorOpened: false,
				isViewerOpened: false,
        isOnModifying: false,
			}
		},
		methods: {
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

.album-card img {
  position: absolute;
  height: 30px;
  width: 30px;
}

.album-card img.delete {
  right: 20px;
}

.album-card img.star {
  right: 60px;
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
