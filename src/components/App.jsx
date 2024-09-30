import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client"
import axios from "axios";
import Header from "./Header"
import Notes from "./Notes"
import Footer from "./Footer"
import CreateArea from "./CreateArea"


function App() {

    const [notes_data, setNotes] = useState([])

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

    const handleNoteSubmit = (note) => {
        // setNotes((prevNotes) => [
        //     ...prevNotes,
        //     {...note, id: prevNotes.length}
        axios.post('/api/notes', note)
        .then(() => setNotes([...notes_data, response.data]))
        .catch(error => console.error('Error adding note: ', error))
        // console.log(response.data)
    }

    const handleNoteDelete = (id) => {
        // setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
        axios.delete(`/api/notes/${id}`)
        .then(() => setNotes(prevNotes => prevNotes.filter(note => note.id !== id)))
        .catch(error => console.error('Error deleting note: ', error))
    }
    
    // console.log(notes_data)
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