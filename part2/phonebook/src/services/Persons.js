import axios from "axios";
const baseUrl = "http://localhost:3001/Persons";

const getAll = () => {
  return axios.get(baseUrl).then((reponse) => reponse.data);
};

const create = (person) => {
  return axios.post(baseUrl, person).then((reponse) => reponse.data);
};

const personService = {getAll, create}

export default personService;
