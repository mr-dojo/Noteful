import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import StoreContext from '../storeContext'
import ErrorCheck from '../ErrorCheck'
import './NoteListNav.css'

export default class NoteListNav extends React.Component {
  static contextType = StoreContext

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <ErrorCheck>
        <div className='NoteListNav'>
          <div className='NoteListNav__button-wrapper'>
            <CircleButton
              tag={Link}
              to='/add-folder'
              type='button'
              className='NoteListNav__add-folder-button'
            >
              <br />
              Add Folder
            </CircleButton>
          </div>
          <ul className='NoteListNav__list'>
            {folders.map(folder =>
              <li key={folder.id}>
                <NavLink
                  className='NoteListNav__folder-link'
                  to={`/folder/${folder.id}`}
                >
                  <span className='NoteListNav__num-notes'>
                    {countNotesForFolder(notes, folder.id)}
                  </span>
                  {folder.name}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </ErrorCheck>
    )
  }
}

NoteListNav.defaultProps = {
  folders: [],
}