import { connect } from "react-redux";
import { createAnec } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createAnec(anecdote);
    props.setNotification(`created ${anecdote}`, 2);
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

const mapDispatchToProps = (dispatch) => {
  return {
    createAnec: (value) => {
      dispatch(createAnec(value));
    },
    setNotification: (msg, timeSeconds) => {
      dispatch(setNotification(msg, timeSeconds));
    },
  };
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
