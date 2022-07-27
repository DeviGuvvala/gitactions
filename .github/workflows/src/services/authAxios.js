import axios from 'axios';
const localurl = 'http://202.131.123.86:8081/true_circle/WS/'
const productionUrl = "https://truecircle.projectspreview.net/WS/"

export default axios.create({
  baseURL: productionUrl,
  timeout: 50000,
});




