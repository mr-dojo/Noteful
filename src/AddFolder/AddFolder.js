import React from 'react'
import StoreContext from '../storeContext'

function randomId() {
  return Math.random().toString()
}

export default class AddFolder extends React.Component {

  static defaultProps = {
      back: () => {}
  }


  static contextType = StoreContext

  state = {
    folders: this.context.folders
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.context.folders);
    const value = e.target.folder.value
    const newFolder = {
      id: randomId(),
      name: value,
    }
    fetch('http://localhost:9090/folders', {
      method: 'POST',
      body: JSON.stringify(newFolder),
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
      this.context.addFolder(newFolder);
      this.props.back();
    })
    .catch(err => {
      throw new Error(err);
    })
  }

  render() {
    return (
      <div className="form-container">
        <form className="folder-form" onSubmit={e => this.handleSubmit(e)}>
          <h1>New Folder</h1>
          <label htmlFor="folder" className="form-label">Enter Folder Name</label>
          <input type="text" name="folder" placeholder="Folder name here"></input>
          <button type="submit" className="form-submit">Save</button>
        </form>
      </div>
    )
  }
}