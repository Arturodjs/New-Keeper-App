import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header"
import Notes from "./Notes"
import Footer from "./Footer"
import CreateArea from "./CreateArea"


function App() {

    //We setup our variables to manage the state of the notes we will be using.
    const [notes_data, setNotes] = useState([])

    //This is used to fetch all notes already stored on page load. We also validate that we receive then in an array format.
    useEffect(() => {
        axios.get('/api/notes')
        .then(response => {
            if (Array.isArray(response.data)){
                setNotes(response.data)
            } else {
                console.error('API response is not an array')
                console.log(response.data)
            }
    })
        .catch(error => console.error('Error fetching notes: ', error))
    }, []);

    //This is our submit handle function. Used to handle the submission of new notes
    const handleNoteSubmit = (note) => {
        axios.post('/api/notes', note)
        .then(() => setNotes([...notes_data, response.data]))
        .catch(error => console.error('Error adding note: ', error))
    }

    //This is our delete handle function. Used to handle the deletion of notes, based on the id of said note.
    const handleNoteDelete = (id) => {
        axios.delete(`/api/notes/${id}`)
        .then(() => setNotes(prevNotes => prevNotes.filter(note => note.id !== id)))
        .catch(error => console.error('Error deleting note: ', error))
    }
    
    //Then we return all our components.
    return (
        <div>
            <Header />
            <CreateArea onNoteSubmit={handleNoteSubmit}/>
            {notes_data.length < 0 ? "" : 
                notes_data.map( note => <Notes 
                    key = {note.id}
                    note = {note}
                    onDelete = {handleNoteDelete}
                />)}
            <Footer />
        </div>
    )
}

export default App