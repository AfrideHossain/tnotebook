import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;

    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

    const ref = useRef(null);
    const closeRef = useRef(null);

    //updateNote Function
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }

    //handleClick Function
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        ref.current.click();
        // console.log("Updateting the note...", note);
    }

    //onChange Function
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <AddNote />

            {/* Bootstrap modal for edit note */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Open Edit Note Modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {/* Form for editing note */}

                            <form className='my-2' spellCheck="false">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' onChange={onChange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    {/* <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription} /> */}
                                    <textarea rows="5" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="teag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 8} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your notes</h2>
                <div className="container text-center">
                    <p className='fw-bold fs-4 text-muted'>
                        {notes.length === 0 && 'Currently there is no notes to show.'}
                    </p>
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    );
};

export default Notes;
