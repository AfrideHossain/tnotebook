import NoteContext from "./noteContext";
import { useState } from "react";
const NoteSate = (props) => {

    const initNotes = [
        {
            "_id": "61e5a8c482ada45a3b551ee4",
            "user": "61e2fdf7fd9434bf00fce453",
            "title": "My 1st note",
            "description": "It's a great note",
            "tag": "personal",
            "date": "2022-01-17T17:35:00.045Z",
            "__v": 0
        },
        {
            "_id": "61eade558e4588fc06bef9d7",
            "user": "61e2fdf7fd9434bf00fce453",
            "title": "My 2nd note",
            "description": "It's a great note also",
            "tag": "personal",
            "date": "2022-01-21T16:24:53.648Z",
            "__v": 0
        },
        {
            "_id": "61eade8e8e4588fc06bef9da",
            "user": "61e2fdf7fd9434bf00fce453",
            "title": "My 3rd note",
            "description": "It's also a great note",
            "tag": "personal",
            "date": "2022-01-21T16:25:50.728Z",
            "__v": 0
        }
    ];
    const [notes, setNotes] = useState(initNotes);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteSate;