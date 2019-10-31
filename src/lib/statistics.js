import axios from 'axios';

const baseUrl = 'http://13.124.160.239:80/admin/statistics';

// export const getDailyConnect = () => axios.get(`${baseUrl}/day`);
// export const getTotalConnect = () => axios.get(`${baseUrl}/allDay`);
export const getYearlyStatistics = (year) => axios.get(`${baseUrl}/year`, { params: { year } });
export const getMonthlyStatistics = (month) => axios.get(`${baseUrl}/month`, { params: { month } });
export const getdailyStatistics = (day) => axios.get(`${baseUrl}/day`, { params: { day } });
