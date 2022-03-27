import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((reponse) => reponse.data);
};

const create = (person) => {
  return axios.post(baseUrl, person).then((reponse) => reponse.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const personService = { getAll, create, deletePerson };

export default personService;
