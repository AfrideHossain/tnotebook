import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <strong className={`card-text text-${note.tag.length === 0 ? "danger" : "primary"}`}>{note.tag.length === 0 ? "Tag undefined" : "#" + note.tag}</strong>
                    <p className="card-text">{note.description}</p>
                    <div className="fontAwesomeIcons">
                        <i className="far fa-trash-alt" onClick={() => { deleteNote(note._id);props.showAlert("A note has been deleted", "success") }}></i>
                        <i className="far fa-edit" onClick={() => { updateNote(note) }}></i>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default NoteItem;
