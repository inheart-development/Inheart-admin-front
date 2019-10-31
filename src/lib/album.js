import axios from 'axios';
import { baseUrl } from './setting';

const contentBaseUrl = `${baseUrl}/album`;

export const getAlbums = () => axios.get(`${contentBaseUrl}/list`);
export const getDetailAlbum = albumNo => axios.get(`${contentBaseUrl}`, {
  params: {
    albumNo
  }
});
export const addAlbum = albumInfo => axios.post(`${contentBaseUrl}`, albumInfo);
export const modifyAlbum = albumInfo => axios.put(`${contentBaseUrl}`, albumInfo);
export const deleteAlbum = id => axios.delete(`${contentBaseUrl}`, {
  data: {
    albumNo: id
  }
});

export const addRecommmendAlbum = id => axios.post(`${contentBaseUrl}/recommend`, id);
export const deleteRecommmendAlbum = id => axios.delete(`${contentBaseUrl}/recommend`, { data: { albumNo: id }});