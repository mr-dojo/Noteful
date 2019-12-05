import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import StoreContext from '../storeContext'
import {getNotesForFolder} from '../notes-helpers'
// import './NoteListMain.css';


export default class NoteListMain extends React.Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = StoreContext

  render() {

    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const folderNotes = getNotesForFolder(notes, folderId)

    return (
      <section className='NoteListMain'>
        <ul>
          {folderNotes.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}