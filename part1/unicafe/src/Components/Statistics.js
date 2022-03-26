import StatisticLine from "./StatisticLine";

const Statistics = ({good, neutral, bad}) => {
  return (
    <>
      <h1>Statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
    </>
  );
};

export default Statistics;
