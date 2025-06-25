const Filter = ({ searchPerson, handleSearchChange, isSearching }) => {
    console.log("issearFilter", isSearching);
    return (
        <div>Search <input value={searchPerson} onChange={handleSearchChange}></input>
        </div>
    )
}
export default Filter