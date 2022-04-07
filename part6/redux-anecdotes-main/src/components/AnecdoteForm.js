import { useDispatch } from "react-redux";
import { createAnec } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnec = await anecdotesService.createNew(anecdote);
    dispatch(createAnec(newAnec));
    dispatch(setNotification(`created ${anecdote}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
