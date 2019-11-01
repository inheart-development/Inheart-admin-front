import axios from 'axios';
import { baseUrl } from './setting';
axios.defaults.withCredentials = true

const statisticsBaseUrl = `${baseUrl}/statistics`;

export const getYearlyStatistics = (year) => axios.get(`${statisticsBaseUrl}/year`, { params: { year } });
export const getMonthlyStatistics = (month) => axios.get(`${statisticsBaseUrl}/month`, { params: { month } });
export const getdailyStatistics = (day) => axios.get(`${statisticsBaseUrl}/day`, { params: { day } });
export const getConnectionCount = () => axios.get(`${statisticsBaseUrl}/cnt`);