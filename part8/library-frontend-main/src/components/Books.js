import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState(null);
  const filteredBooks = useQuery(ALL_BOOKS, { variables: { genre } });

  if (!show) {
    return null;
  }

  if (filteredBooks.loading) return <div>Loading...</div>;

  const filterGenre = (genre) => {
    filteredBooks.refetch();
    setGenre(genre);
  };

  const showAllBooks = () => {
    setGenre(null);
  };

  const genres = [
    ...new Set(
      books.map((book) => book.genres).reduce((prev, cur) => prev.concat(cur))
    ),
  ];

  return (
    <div>
      <h2>books</h2>

      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((g) => (
        <button key={g} onClick={() => filterGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={showAllBooks}>all genres</button>
    </div>
  );
};

export default Books;
