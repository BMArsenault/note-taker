const fs = require('fs');
const path = require('path');
const file_path = path.join(__dirname, "db.json");

const uuid = require('uuid')
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notesfile {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then((notes) => {
            let parseNotes
            try {
                parseNotes = [].concat(JSON.parse(notes))
            } 
            catch(err) {
                parseNotes = []
            }
            return parseNotes;
        })
    }
}

module.exports = new Notesfile;