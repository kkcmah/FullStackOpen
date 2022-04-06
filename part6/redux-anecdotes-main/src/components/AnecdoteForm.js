import { useDispatch } from "react-redux";
import { createAnec } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnec(anecdote));
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
