import React from "react";
import NoteList from "./NoteList";
import { getInitialData } from "../utils/index"
import NoteInput from "./NoteInput";
import SearchBar from "./SearchBar";

class NoteApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notes: getInitialData(),
            search: '',
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    onDeleteHandler(id){
        const notes = this.state.notes.filter((note) => note.id !== id);
        this.setState({ notes });
    }

    onArchiveHandler(id){
        const archiveNote = this.state.notes.map((note) => (note.id === id ? {...note, archived: !note.archived} : note));
        this.setState({notes: archiveNote});
    }

    onAddNoteHandler({ title, body }){
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        archived: false,
                        createdAt: new Date().toISOString(),
                    }
                ]
            }
        });
    }

    onSearchHandler(event){
        this.setState(() => {
            return {
                search: event.target.value
            }
        });
    }

    render(){
        const filteredNotes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.search.toLowerCase()));

        const activeNotes = filteredNotes.filter((note) => {
            return note.archived === false;
        });

        const archivedNotes = filteredNotes.filter((note) => {
            return note.archived === true;
        });

        return(
            <>
                <div className="note-app__header">
                    <h1>InstaMemo</h1>
                    <SearchBar onSearch={this.onSearchHandler} />
                </div>
                <div className="note-app__body">
                    <h2>Create a Note</h2>
                    <NoteInput addNote={this.onAddNoteHandler} />
                    <h2>Active Notes</h2>
                    <NoteList notes={activeNotes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
                    <h2>Archive Notes</h2>
                    <NoteList notes={archivedNotes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
                </div>
            </>
        );
    }
}

export default NoteApp;