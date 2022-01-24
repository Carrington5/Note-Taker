// app.get (to get notes from db), app.post (to add notes to db, use fs to push to local html), app.delete (to remove notes from db, use fs to delete from index)
// build out funcitons in store.js file and reference in API routes below
const router = require('express').Router();
const Store = require('../db/store');

// Get existing notes from db
router.get('/notes', (req, res) => {
    Store.getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
});

// post new notes to the db
router.post('/notes', (req, res) => {
    Store.addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(400).json(err));
});

// Delete notes within database by id
router.delete('/notes/:id', (req, res) => {
    Store.deleteNote(req.params.id)
        .then(() => res.json({ ok: true })) // read up on ok: true
        .catch((err) => res.status(400).json(err));
});

module.exports = router