import React from 'react'
import StoreContext from '../storeContext'

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
    console.log(this.context.notes);
    const name = e.target.name.value
    const content = e.target.content.value
    const folderId = e.target.folder.value
    const newNote = {
      id: "note" + randomId(),
      name: name,
      modified: Date.now(),
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
          <label htmlFor="name" className="newNote-label">Note name</label>
          <input type="text" name="name" placeholder="name here"></input>
          <label htmlFor="content" className="newNote-label">Note content</label>
          <textarea name="content" className="newNote-content" rows="5" cols="10" placeholder="content here"></textarea>
          <label htmlFor="folder" className="newNote-folder">Choose folder</label>
          <select name="folder" required>
            {this.context.folders.map(folder => {
              return <option value={folder.id}>{folder.name}</option>
            })}
          </select>
          <button type="submit" className="form-submit">Save</button>
        </form>
      </div>
    )
  }
}