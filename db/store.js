// under class - functions to read, write, getnotes, addnotes, remove notes. Bring in FS from Express.

const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid'); // read up on uuid in NPM
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile); // read up on Promisefy

class Store {
    readNotes() {
        return readFileAsync('db/db.json', 'utf-8');
    }

    writeNotes(newNote) {
        return writeFileAsync('db/db.json', JSON.stringify(newNote));
    }

    getNotes() {
        return this.readNotes().then((notes) => {
            let returnedNotes;
            try {
                returnedNotes = [].concat(JSON.parse(notes))
            } catch (error) { 
                returnedNotes = []
            }
            return returnedNotes;
        })
    }

    addNote(note) {
        let { title, text } = note 
        if (!title || !text) {
            throw new Error('Title and text are required, please re-enter the note!');
        }
        let noteObject = {title, text, id:uuidv4()}
        return this.getNotes()
        .then((notes) => [...notes, noteObject])
        .then((updateNotes) => this.writeNotes(updateNotes))
        .then(() => noteObject)
    }

    deleteNote(id) {
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.writeNotes(filteredNotes));
    }
}

module.exports = new Store();