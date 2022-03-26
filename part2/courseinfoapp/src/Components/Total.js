const Total = ({ parts }) => {
  const total = parts.reduce((prev, curr) => {
    return prev + curr.exercises;
  }, 0);
  return <p>Number of exercises {total}</p>;
};

export default Total;
