import axios from 'axios';

const baseUrl = 'http://54.180.153.125:3000/admin';

export const getFaqs = () => axios.get(`${baseUrl}/faq/list`);

export const modifyFaq = ({ question, answer, index }) => axios.put(`${baseUrl}/faq`, {
  faqQuestion: question,
  faqAnswer: answer,
  faqNo: index,
});

export const deleteFaq = ({ index }) => axios.delete(`${baseUrl}/faq`, {
  data: {
    faqNo: index,
  },
});
