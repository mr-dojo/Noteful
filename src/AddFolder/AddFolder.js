import React from "react";
import StoreContext from "../storeContext";

export default class AddFolder extends React.Component {
  static contextType = StoreContext;

  state = {
    folders: this.context.folders
  };

  handleSubmit = e => {
    e.preventDefault();
    const value = e.target.folder.value;
    const newFolder = {
      name: value
    };
    fetch("http://localhost:8000/api/folders", {
      method: "POST",
      body: JSON.stringify(newFolder),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          return new Error(response.message);
        }
        return response.json();
      })
      .then(() => {
        this.context.addFolder(newFolder);
        this.props.history.push("/");
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  render() {
    return (
      <div className="form-container">
        <form className="folder-form" onSubmit={e => this.handleSubmit(e)}>
          <h1>New Folder</h1>
          <label htmlFor="folder" className="form-label">
            Enter Folder Name
          </label>
          <input
            type="text"
            name="folder"
            placeholder="Folder name here"
            required
          ></input>
          <button type="submit" className="form-submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}
