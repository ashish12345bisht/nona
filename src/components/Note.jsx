import React from 'react'

const Note = ({ note, deleteNote, openModal }) => {
    return (
        <div class="card" style={{ width: "18rem", margin: "1rem" }}>
            <div class="card-body">
                <h5 class="card-title">{note.name}</h5>
                <p class="card-text">{note.details}</p>
                <button type="button" class="btn btn-secondary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => openModal(note)}>Update</button>
                <button type="button" class="btn btn-danger mx-2" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Note