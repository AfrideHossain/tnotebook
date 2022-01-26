import NoteContext from "./noteContext";
import { useState } from "react";
const NoteSate = (props) => {

    const initNotes = [];
    const [notes, setNotes] = useState(initNotes);

    //host
    const host = "http://localhost:5000";

    //fetch all note
    const getAllNotes = async () => {

        //Add note API call
        let url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlNThjYzEyNTI3ODRjMDYzZTBkOTYwIn0sImlhdCI6MTY0MzE3ODMxNX0.QjImSQgLO2i8-EF8aRCHHxry3Qv9GxysdPIT-iATDOc'
            }
        });
        const jsonResp = await response.json();
        // console.log(jsonResp);
        setNotes(jsonResp);
    }

    //Add a note
    const addNote = async (title, description, tag) => {

        //Add note API call
        let url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlNThjYzEyNTI3ODRjMDYzZTBkOTYwIn0sImlhdCI6MTY0MzE3ODMxNX0.QjImSQgLO2i8-EF8aRCHHxry3Qv9GxysdPIT-iATDOc'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        // console.log(note);

        setNotes(notes.concat(note));
    }

    //Delete a note
    const deleteNote = async (id) => {

        //Add note API call
        let url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlNThjYzEyNTI3ODRjMDYzZTBkOTYwIn0sImlhdCI6MTY0MzE3ODMxNX0.QjImSQgLO2i8-EF8aRCHHxry3Qv9GxysdPIT-iATDOc'
            }
        });
        const jsonResp = await response.json();
        // console.log(jsonResp);

        // console.log("Deleting note with id: " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //Edit note API call
        let url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlNThjYzEyNTI3ODRjMDYzZTBkOTYwIn0sImlhdCI6MTY0MzE3ODMxNX0.QjImSQgLO2i8-EF8aRCHHxry3Qv9GxysdPIT-iATDOc'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const jsonResp = await response.json();
        // console.log(jsonResp);

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }

        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteSate;