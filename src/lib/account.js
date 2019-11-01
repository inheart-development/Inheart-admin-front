import axios from 'axios';
import { baseUrl } from './setting';
axios.defaults.withCredentials = true

export const signin = ({
  email, password,
}) => axios.post(`${baseUrl}/login`, {
  adminId: email,
  adminPw: password,
});

export const signout = () => axios.get(`${baseUrl}/logout`);
