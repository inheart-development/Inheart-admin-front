import axios from 'axios';

const baseUrl = 'http://54.180.153.125:3000/admin';

export const getAllContent = () => axios.get(`${baseUrl}/contents/list`);

export const getCategoryContent = ({ categoryNo }) => axios.get(`${baseUrl}/contents/category/list`, {
  params: {
    categoryNo,
  },
});

export const getDetailContent = ({ contentsNo }) => axios.get(`${baseUrl}/contents`, {
  params: {
    contentsNo,
  },
});

export const postNewContent = ({ formData }) => axios.post(`${baseUrl}/contents`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const modifyContent = ({ formData }) => axios.put(`${baseUrl}/contents`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const deleteContent = ({ contentsNo }) => axios.delete(`${baseUrl}/contents`, {
  data: {
    contentsNo,
  },
});
