import axios from 'axios';

const baseUrl = 'http://54.180.153.125:3000/admin';

export const getUsers = () => axios.get(`${baseUrl}/user/list`);

export const getDetailUser = ({ num }) => axios.get(`${baseUrl}/user/meditotal`, {
  params: {
    userNo: num,
  },
});

export const deleteUser = ({ num }) => axios.delete(`${baseUrl}/user`, {
  data: {
    userNo: num,
  },
});
