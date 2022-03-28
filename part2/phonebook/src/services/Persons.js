import axios from "axios";
// changed from http://localhost:3001/api/persons for deploying
// and using proxy
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((reponse) => reponse.data);
};

const create = (person) => {
  return axios.post(baseUrl, person).then((reponse) => reponse.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, updatedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data);
};

const personService = { getAll, create, deletePerson, update };

export default personService;
