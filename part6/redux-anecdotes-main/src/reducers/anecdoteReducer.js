import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnec(state, action) {
      state.push(action.payload);
    },
    setAnecs(state, action) {
      return action.payload;
    },
    appendAnec(state, action) {
      state.push(action.payload);
    },
    updateAnec(state, action) {
      const updatedAnec = action.payload;
      return state.map((anec) =>
        anec.id !== updatedAnec.id ? anec : updatedAnec
      );
    },
  },
});

export const { setAnecs, appendAnec, updateAnec } = anecdoteSlice.actions;

export const initializeAnecs = () => {
  return async (dispatch) => {
    const anecs = await anecdotesService.getAll();
    dispatch(setAnecs(anecs));
  };
};

export const createAnec = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdotesService.createNew(content);
    dispatch(appendAnec(newAnec));
  };
};

export const voteAnec = (id) => {
  return async (dispatch, getState) => {
    const anecToUpdate = getState().anecdotes.find((a) => a.id === id);
    const updatedAnec = { ...anecToUpdate, votes: anecToUpdate.votes + 1 };
    const res = await anecdotesService.vote(id, updatedAnec);
    dispatch(updateAnec(res));
  };
};

export default anecdoteSlice.reducer;

// const reducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);
//   switch (action.type) {
//     case "VOTE":
//       const idToUpdate = action.data;
//       const anecToUpdate = state.find((a) => a.id === idToUpdate);
//       const updatedAnec = { ...anecToUpdate, votes: anecToUpdate.votes + 1 };
//       return state.map((anec) => (anec.id !== idToUpdate ? anec : updatedAnec));
//     case "CREATE_ANEC":
//       return [...state, action.data];
//     default:
//       return state;
//   }
// };

// export const voteAnec = (id) => {
//   return { type: "VOTE", data: id };
// };

// export const createAnec = (anecdote) => {
//   return {
//     type: "CREATE_ANEC",
//     data: { content: anecdote, id: getId(), votes: 0 },
//   };
// };
