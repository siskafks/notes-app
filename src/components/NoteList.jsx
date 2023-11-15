import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onArchive }){
    return notes.length > 0 ?(
        <div className="notes-list">
            {
                notes.map((note) => (
                    <NoteItem 
                    key={note.id} 
                    id={note.id}
                    archived={note.archived}
                    onDelete={onDelete}
                    onArchive={onArchive}
                    {...note} />
                ))
            }
        </div>
    ) : (
        <div className="note-list__empty-message">
            No notes
        </div>
    )
}

export default NoteList;