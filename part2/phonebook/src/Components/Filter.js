const Filter = ({filterName, handleFilterChange}) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterName} onChange={handleFilterChange}></input>
    </div>
  );
};

export default Filter;
