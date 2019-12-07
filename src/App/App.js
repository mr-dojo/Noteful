import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import StoreContext from '../storeContext';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import './App.css';

export default class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    deleteNote = noteId => {
            this.setState({
                notes: this.state.notes.filter(note => note.id !== noteId),
            })
        }
    
    addFolder = newFolder => {
        this.setState({
            folders: [...this.state.folders, newFolder],
        })
        console.log("Added new folder to state");
    }

    componentDidMount() {
        Promise.all([
            fetch('http://localhost:9090/folders'),
            fetch('http://localhost:9090/notes'),
        ])
        .then(([foldersRes, notesRes]) => {
            if (!foldersRes.ok) {
                return foldersRes.json().then(e => Promise.reject(e));
            }
            if (!notesRes.ok) {
                return notesRes.json().then(e => Promise.reject(e));
            }
            return Promise.all([foldersRes.json(), notesRes.json()])
        })
        .then(([folders, notes]) => {
            console.log(folders);
            this.setState({
                folders: folders,
                notes: notes,
            })
        })
        .catch(err => {
            console.error({err})
        })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
            </>
        );
    }

    render() {

        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.deleteNote,
            addFolder: this.addFolder,
          }

        return (
            <StoreContext.Provider value={contextValue}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </StoreContext.Provider>
        );
    }
}
