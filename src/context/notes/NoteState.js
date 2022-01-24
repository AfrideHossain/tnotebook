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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMmZkZjdmZDk0MzRiZjAwZmNlNDUzIn0sImlhdCI6MTY0MjMxMjk4M30.PNxLiZedJOMmVHNg1W-QND8_bbgjNQ3sPmXrOHT2XI8'
            }
        });
        const jsonResp = await response.json();
        console.log(jsonResp);
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMmZkZjdmZDk0MzRiZjAwZmNlNDUzIn0sImlhdCI6MTY0MjMxMjk4M30.PNxLiZedJOMmVHNg1W-QND8_bbgjNQ3sPmXrOHT2XI8'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        console.log(note);
        // setNotes(note);

        /*const note = {
            "_id": "61eade8e8e4588fc06bef9da",
            "user": "61e2fdf7fd9434bf00fce453",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-01-21T16:25:50.728Z",
            "__v": 0
        };*/

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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMmZkZjdmZDk0MzRiZjAwZmNlNDUzIn0sImlhdCI6MTY0MjMxMjk4M30.PNxLiZedJOMmVHNg1W-QND8_bbgjNQ3sPmXrOHT2XI8'
            }
        });
        const jsonResp = await response.json();
        console.log(jsonResp);

        console.log("Deleting note with id: " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = () => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteSate;