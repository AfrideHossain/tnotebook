const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

//ROUTE 1: Fetch all notes using GET (/api/notes/fetchallnotes). Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");;
    }
})

//ROUTE 2: Add note using POST (/api/notes/addnote). Login required.
router.post("/addnote", fetchuser, [
    body('title', 'Title must be at least 3 charecters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 8 characters').isLength({ min: 8 })
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        //if there are any errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");;
    }
})

//ROUTE 3: Update an existing note using PUT (/api/notes/updatenote/:id). Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        //create newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");;
    }

})

//ROUTE 4: Delete an existing note using DELET (/api/notes/deletenote/:id). Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {

        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        //allow deletion if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");;
    }

})

module.exports = router;