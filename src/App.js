import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import $ from 'jquery'

function App() {
  const [notes, setNotes] = useState([])
  const [displayNote, setDisplayNote] = useState([])
  const [status, setStatus] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    details: ""
  })
  const [search, setSearch] = useState("")
  const [id, setId] = useState("")
  useEffect(() => {
    if (localStorage.note) {
      setNotes(JSON.parse(localStorage.note))
      setDisplayNote(JSON.parse(localStorage.note))
    }
  }, [])
  const genUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  const addNote = () => {
    let obj = {
      name: formData.name,
      details: formData.details,
      id: genUUID()
    }
    setNotes([...notes, obj])
    setDisplayNote([...notes, obj])
    setFormData({ name: "", details: "" })
    localStorer([...notes, obj])
    setSearch("")
    // console.log(obj)
  }
  const deleteNote = (id) => {
    let tempArr = notes.filter((item) => item.id !== id);
    setNotes(tempArr)
    setDisplayNote(tempArr)
    setSearch("")
    localStorer(tempArr)
  }

  const openModal = (note) => {
    setStatus(false)
    setFormData({
      name: note.name,
      details: note.details
    })
    setId(note.id)
  }
  const editNote = () => {
    let tempArr = [];
    notes.forEach((item) => {
      if (item.id === id) {
        item.name = formData.name;
        item.details = formData.details
      }
      tempArr.push(item)
    })
    setNotes(tempArr)
    setDisplayNote(tempArr)
    setId("")
    setStatus(true)
    setFormData({ name: "", details: "" })
    localStorer(tempArr)
    setSearch("")
  }
  const localStorer = (data) => {
    localStorage.setItem("note", JSON.stringify(data))
  }
  return (
    <div className="App">
      <div className='border-bottom'>
        <form class="d-flex w-25 m-auto my-4 " role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={e => {
            setSearch(e.target.value)
            let tempNotes = notes.filter(item => item.name.indexOf(e.target.value) > -1)
            setDisplayNote(tempNotes)
          }} />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> + Add</button>
      <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Note</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setFormData({ name: "", details: "" })}></button>
            </div>
            <div class="modal-body d-flex flex-column">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Title</label>
                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="email" class="form-control" id="exampleFormControlInput1" placeholder="Do Homework..." />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                <textarea value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setFormData({ name: "", details: "" })}>Close</button>
              <button type="button" class="btn btn-primary" onClick={() => status ? addNote() : editNote()} data-bs-dismiss="modal">{status ? "Add" : "Update"} Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-around flex-wrap'>
        {displayNote.map((item, index) => (
          <Note deleteNote={deleteNote} openModal={openModal} key={index} note={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
