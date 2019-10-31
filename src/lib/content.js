import axios from 'axios';
import { baseUrl } from './setting';

const contentBaseUrl = `${baseUrl}/meditation`;

export const getMeditations = () => axios.get(`${contentBaseUrl}/list`);
export const getDetailMeditation = meditationNo => axios.get(`${contentBaseUrl}`, {
  params: meditationNo
});
export const addMeditation = formdata => axios.post(`${contentBaseUrl}`, formdata, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const modifyMeditation = formdata => axios.put(`${contentBaseUrl}`, formdata, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const deleteMeditation = meditationNo => axios.delete(`${contentBaseUrl}`, {
  data: {
    meditationNo
  } 
});
