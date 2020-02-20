import React from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import StoreContext from "../storeContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";
import ErrorCheck from "../ErrorCheck";

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };

  static contextType = StoreContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const folderNotes = getNotesForFolder(notes, folderId);
    console.log(folderNotes);

    return (
      <ErrorCheck>
        <section className="NoteListMain">
          <div className="NoteListMain__button-container">
            <CircleButton
              tag={Link}
              to="/add-note"
              type="button"
              className="NoteListMain__add-note-button"
            >
              <br />
              Add Note
            </CircleButton>
          </div>
          <ul>
            {folderNotes.map(note => (
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                  history={this.props.history}
                />
              </li>
            ))}
          </ul>
        </section>
      </ErrorCheck>
    );
  }
}
