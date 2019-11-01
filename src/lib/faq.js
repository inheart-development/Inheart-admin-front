import axios from 'axios';
import { baseUrl } from './setting';
axios.defaults.withCredentials = true

const faqBaseUrl = `${baseUrl}/faq`;

export const getFaqs = () => axios.get(`${faqBaseUrl}/list`);
export const getDetailFaq = faqNo => axios.get(`${faqBaseUrl}`, { params: { faqNo }});
export const addFaq = faq => axios.post(`${faqBaseUrl}`, faq);
export const modifyFaq = faq => axios.put(`${faqBaseUrl}`, faq);
export const deleteFaq = index => axios.delete(`${faqBaseUrl}`, {
  data: {
    faqNo: index,
  },
});
