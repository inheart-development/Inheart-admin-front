import axios from 'axios';

const baseUrl = 'http://54.180.153.125:3000/api/admin';

export const getDailyConnect = () => axios.get(`${baseUrl}/statis/day`);

export const getTotalConnect = () => axios.get(`${baseUrl}/statis/allDay`);
