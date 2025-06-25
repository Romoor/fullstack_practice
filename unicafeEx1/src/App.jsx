//e2.15
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchPerson, setSearchPerson] = useState('')
    const [filterPersons, setFilterPersons] = useState(persons)
    const [isSearching, setIsSearching] = useState(false)
    const [notifMessage, setNotifMessage] = useState(null)

    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    }, [])

    console.log('render', persons.length, 'persons');

    const checkUnique = (event) => {
        event.preventDefault()
        console.log("nn", newName);
        const curName = persons.find(e => e.name === newName)
        console.log("curName", curName);
        if (curName !== undefined) {
            console.log("same name");
            const okUpdate = window.confirm(`${newName} is already added to phonebook, do you want to update the information?`)
            if (!okUpdate) {
                return;
            }
            const personObject = {
                name: newName,
                id: curName.id,
                number: newNumber
            }
            personsService.update(personObject)
                .then(person => {
                    console.log("updating person");
                    setPersons(prevPersons =>
                        prevPersons.map(person =>
                            person.id === curName.id
                                ? { ...person, number: personObject.number }
                                : person

                        )
                    )
                    setNewName("");
                    setNewNumber("");
                    return person
                })
                .then(() => {
                    console.log("updated number");
                    setNotifMessage(
                        `Updated ${personObject.name
                        }`
                    )
                    setTimeout(() => {
                        setNotifMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    console.log("error with update number promise chain", error.response?.data || error.message)
                    setNotifMessage(
                        `Failed to update ${personObject.name
                        }`
                    )
                    setTimeout(() => {
                        setNotifMessage(null)
                    }, 5000)
                }
                )
        }
        else {
            console.log("not new name");
            addPerson(event)
        }
    }

    const addPerson = (event) => {
        event.preventDefault()
        console.log("addPerson");

        const personObject = {
            name: newName,
            id: Date.now().toString(),
            number: newNumber
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        console.log("persons", persons);
        setIsSearching(false)

        personsService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNotifMessage(
                    `Added ${personObject.name}`
                )
                setTimeout(() => {
                    setNotifMessage(null)
                }, 5000)
            })

    }

    const deletePerson = (id, name) => {
        console.log("delete person");
        const okDelete = window.confirm(`Delete ${name} ? `)
        if (!okDelete) {
            return;
        }
        personsService.deletePerson(id).then(
            () => {
                setPersons(persons.filter(persons => persons.id !== id))
                console.log("petson deleted");
            }
        )
    }

    const handleNameChange = (event) => {
        console.log("hnc");
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        console.log("hnc");
        setNewNumber(event.target.value)

    }
    const handleSearchChange = (event) => {
        console.log("snn", event.target.value);
        setSearchPerson(event.target.value)

        personsService
            .getAll()
            .then(allPersons => {
                setFilterPersons(allPersons
                    .filter((e => e.name.toLowerCase()
                        .includes(event.target.value))))
            })
        console.log("isercHandleChange", isSearching);
        setIsSearching(true)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notifMessage} />
            <Filter searchPerson={searchPerson} handleSearchChange={handleSearchChange} isSearching={isSearching} />
            <h2>Add new person</h2>
            <PersonForm newName={newName} newNumber={newNumber}
                addPerson={addPerson} checkUnique={checkUnique}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={persons} filterPersons={filterPersons}
                isSearching={isSearching} deletePerson={deletePerson} />
        </div >
    )
}

export default App