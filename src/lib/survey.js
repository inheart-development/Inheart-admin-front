import axios from 'axios';

const baseUrl = 'http://54.180.153.125:3000/api/admin';

export const getSurveys = () => axios.get(`${baseUrl}/survey/list`);

export const modifySurvey = ({
  title,
  index,
}) => axios.put(`${baseUrl}/survey`, {
  surveyTitle: title,
  surveyTitleNo: index,
});
