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

const createSoundContent = formData => axios.post(`${baseUrl}/contents/sound`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const createTextcontent = formData => axios.post(`${baseUrl}/contents/text`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const postNewContent = ({ formData, contentType }) => {
  if (contentType === 'sound') {
    return createSoundContent(formData);
  }
  return createTextcontent(formData);
};

const modifyTextContent = formData => axios.put(`${baseUrl}/contents/text`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const modifySoundContent = formData => axios.put(`${baseUrl}/contents/sound`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const modifyContent = ({ formData, contentType }) => {
  if (contentType === 'sound') {
    return modifySoundContent(formData);
  }
  return modifyTextContent(formData);
};

export const deleteContent = ({ contentsNo }) => axios.delete(`${baseUrl}/contents`, {
  data: {
    contentsNo,
  },
});
