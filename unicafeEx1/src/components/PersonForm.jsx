const PersonForm = ({ newName, newNumber, checkUnique, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={checkUnique}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm