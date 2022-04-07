import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newAnec = { content, votes: 0 };
  const response = await axios.post(baseUrl, newAnec);
  return response.data;
};

const anecdotesService = { getAll, createNew };
export default anecdotesService;
