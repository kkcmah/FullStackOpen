import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState(null);

  const resultAuthors = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);

  if (resultAuthors.loading || resultBooks.loading)
    return <div>Loading...</div>;

  const notify = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      {error && <div style={{ color: "red" }}>error: {error}</div>}

      <Authors
        authors={resultAuthors.data.allAuthors}
        show={page === "authors"}
      />

      <Books books={resultBooks.data.allBooks} show={page === "books"} />

      <NewBook setError={notify} show={page === "add"} />
    </div>
  );
};

export default App;
