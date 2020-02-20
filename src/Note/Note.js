import React from "react";
import { Link } from "react-router-dom";
import StoreContext from "../storeContext";
import PropTypes from "prop-types";

export default class Note extends React.Component {
  static contextType = StoreContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.history.push("/");
      })
      .catch(error => {
        console.error({ error });
      });
  };
  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified
            <span className="Date">{modified}</span>
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  id: PropTypes.number,
  modified: PropTypes.string,
  name: PropTypes.string
};
