import React from 'react'
import StoreContext from '../storeContext'
import "./AddNote.css"

function randomId() {
  return Math.random().toString()
}

export default class AddNote extends React.Component {

  static contextType = StoreContext

  state = {
    notes: this.context.notes
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value
    const content = e.target.content.value
    const folderId = e.target.folder.value
    const newDate = new Date();

    const newNote = {
      id: "note" + randomId(),
      name: name,
      modified: newDate.toISOString(),
      folderId: folderId,
      content: content,
    }

    fetch('http://localhost:9090/notes', {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(response => {
      if(!response.ok) {
        return new Error(response.message);
      }
      return response.json();
    })
    .then(() => {
      this.context.addNote(newNote);
      this.props.history.push('/');
    })
    .catch(err => {
      throw new Error(err);
    })
  }

  render() {
    return (
      <div className="newNote-container">
        <form className="newNote-form" onSubmit={e => this.handleSubmit(e)}>
          <h1>New Note</h1>
          <label 
            htmlFor="name" 
            className="newNote-label"
          >
            Name
          </label>
          <br />
          <input 
            type="text" 
            name="name" 
            placeholder="name here" 
            className="newNote-name"
            aria-required="true" 
            required
          />
          <br />
          <label 
            htmlFor="content" 
            className="newNote-label"
          >
            Content
          </label>
          <br />
          <textarea 
            name="content" 
            className="newNote-content" 
            rows="5" 
            cols="10" 
            placeholder="content here" 
            required
          />
          <br />
          <label 
            htmlFor="folder" 
            className="newNote-label"
          >
            Folder
          </label>
          <br />
          <select 
            name="folder"
            className="newNote-folder" 
            aria-required="true" 
            required
          >
            {this.context.folders.map(folder => {
              return <option key={folder.id} value={folder.id}>{folder.name}</option>
            })}
          </select>
          <br />
          <button 
            type="submit" 
            className="form-submit"
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}