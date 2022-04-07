import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import anecdotesService from "./services/anecdotes";
import { setAnecs } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdotesService.getAll().then((res) => dispatch(setAnecs(res)));
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification></Notification>
      <Filter></Filter>
      <AnecdoteForm></AnecdoteForm>
      <AnecdoteList></AnecdoteList>
    </div>
  );
};

export default App;
