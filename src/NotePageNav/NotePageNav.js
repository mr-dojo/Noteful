import React from 'react'
import CircleButton from '../CircleButton/CircleButton'
import StoreContext from '../storeContext'
import {findNote, findFolder} from '../notes-helpers'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import ErrorCheck from '../ErrorCheck'
// import './NotePageNav.css'

export default class NotePageNav extends React.Component {

  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }

  static contextType = StoreContext

  render() {
    const { notes, folders } = this.context
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    const back = () => this.props.history.goBack()
    console.log(folder, note)

    return (
      <ErrorCheck>
        <div className='NotePageNav'>
          <AddFolder back={back} />
          <AddNote back={back} />
          <CircleButton
            tag='button'
            role='link'
            onClick={back}
            className='NotePageNav__back-button'
          >
            <br />
            Back
          </CircleButton>
          
          {(folder) && (
            <h3 className='NotePageNav__folder-name'>
              {folder.name}
            </h3>
          )}
        </div>
      </ErrorCheck>
    )
  }
}