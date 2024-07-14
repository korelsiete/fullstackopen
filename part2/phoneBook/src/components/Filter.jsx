const Filter = ({ filter, handleChangeFilter }) => {
  return (
    <div className="filter">
      <label htmlFor="filter">Filter shown with: </label>
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={handleChangeFilter}
      />
    </div>
  );
};

export default Filter;
