import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getAllNotes } = context;
    
    useEffect(() => {
        getAllNotes();
    }, []);


    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    );
};

export default Notes;
