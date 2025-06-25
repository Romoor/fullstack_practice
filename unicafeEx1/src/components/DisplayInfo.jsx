const DisplayInfo = ({ person, deletePerson }) => {
    console.log("di8spayinfo called");
    return (
        <div>
            {person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}> Delete</button>
        </div>
    )
}
export default DisplayInfo