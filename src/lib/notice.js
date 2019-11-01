import axios from 'axios';
import { baseUrl } from './setting';
axios.defaults.withCredentials = true

const noticeBaseUrl = `${baseUrl}/notice`;

export const getNotices = () => axios.get(`${noticeBaseUrl}/list`);
export const getDetailNotice = id => axios.get(`${noticeBaseUrl}`, { params: { noticeNo: id }})
export const addNotice = notice => axios.post(`${noticeBaseUrl}`, notice);
export const modifyNotice = notice => axios.put(`${noticeBaseUrl}`,  notice);
export const deleteNotice = index => axios.delete(`${noticeBaseUrl}`, {
  data: {
    noticeNo: index,
  },
});
