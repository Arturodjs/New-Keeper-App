import React, {useState} from "react";

function CreateArea({onNoteSubmit}) {

  const [noteData, setNoteData] = useState({
    title: "",
    content: ""
  })

  function handleChange(event) {
    const {value, name} = event.target
    setNoteData(prevValue => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  const handleSubmit = (data) => {
    data.preventDefault()
    onNoteSubmit(noteData)
    // console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <input name="title" placeholder="Title"  value={noteData.title} onChange={handleChange}/>
        <textarea name="content" placeholder="Take a note..." rows="3" value={noteData.content} onChange={handleChange}/>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
