import axios from 'axios';

const baseUrl = 'http://54.180.153.125:3000/admin';

export const signin = ({
  email, password,
}) => axios.post(`${baseUrl}/login`, {
  adminEmail: email,
  adminPassword: password,
});

export const signout = () => axios.get(`${baseUrl}/logout`);
