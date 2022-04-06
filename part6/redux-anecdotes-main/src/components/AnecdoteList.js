import { useSelector, useDispatch } from "react-redux";
import { voteAnec } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  // can destructure from state
  // instead of using state.anecdotes and state.filter
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anec) => anec.content.includes(filter));
  });
  let sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnec(id));
    const votedAnec = anecdotes.find((anec) => anec.id === id);
    dispatch(setNotification(`you voted '${votedAnec.content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
