import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) return <div>Loading...</div> 

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors authors={result.data.allAuthors} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
