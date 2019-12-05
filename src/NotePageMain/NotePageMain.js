import React from 'react'
import Note from '../Note/Note'
import StoreContext from '../storeContext'
import {findNote} from '../notes-helpers'
// import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    }
  }
  static contextType = StoreContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { store } = this.context
    const {noteId} = this.props.match.params;
    const note = findNote(store.notes, noteId);
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}