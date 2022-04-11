import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [updateAuthor, result] = useMutation(EDIT_AUTHOR, {
    // actually dont need refetchQueries because cached author id is updated
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError("author not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  const updateAuthorBirthyear = (e) => {
    e.preventDefault();

    updateAuthor({ variables: { name, setBornTo: +born } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthorBirthyear}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {props.authors.map((a) => (
              <option value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type={"number"}
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
