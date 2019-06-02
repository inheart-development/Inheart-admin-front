import axios from 'axios';

const baseUrl = 'http://54.180.153.125:3000/admin';

export const getSurveys = () => axios.get(`${baseUrl}/survey/list`);

export const ModifySurvey = ({
  title,
  index,
}) => axios.put(`${baseUrl}/survey`, {
  surveyTitle: title,
  surveyTitleNo: index,
});
