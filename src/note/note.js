import React from 'react'
import { Link } from 'react-router-dom'
import StoreContext from '../storeContext'
// import { format } from 'date-fns'


export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }
  static contextType = StoreContext

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
        console.log("Delete Ran")
      })
      .catch(error => {
        console.error({ error })
      })
  }
  render() {
    const {name, id, modified} = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button 
          className='Note__delete' 
          type='button'
          onClick={this.handleClickDelete}
        >
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            <span className='Date'>
              {modified}
            </span>
          </div>
        </div>
      </div>
    )
  }
}