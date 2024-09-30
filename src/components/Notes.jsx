import React from "react";
import ReactDOM from "react-dom/client"


function Notes({note, onDelete}) {
    return (
        <div className="note">
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <button onClick={() => onDelete(note.id)}>DELETE</button>
        </div>
      );
}

export default Notes
// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//     <React.StrictMode>
        
//     </React.StrictMode>
// )