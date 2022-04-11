import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommendations = ({ show, genre }) => {
  const recommendedBooks = useQuery(ALL_BOOKS, { variables: { genre } });

  if (!show) {
    return null;
  }

  if (recommendedBooks.loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>recommendations</h2>

      {genre && (
        <p>
          books in your favorite genre: <b>{genre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
