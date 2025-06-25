import DisplayInfo from "./DisplayInfo";

const Persons = ({ persons, filterPersons, isSearching, getAll, deletePerson }) => {
    //console.log("fp", filterPersons);
    //console.log("isstPersons", isSearching);
    console.log("Persons called");
    const displayPersons = isSearching ?
        filterPersons
        : persons



    return (
        <div>
            {displayPersons.map(person => <DisplayInfo key={person.id} person={person} deletePerson={deletePerson} />
            )}
        </div>
    )
}

export default Persons