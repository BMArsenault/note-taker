const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const notes = require('./db/db.json');
//const router = require('express').Router()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const notesFile = require("./db/notesFile");

app.get('/', (req, res) => {
  console.log("IN /");
  res.sendFile('public/index.html');
});

app.get('/notes', (req, res) => {
  console.log("IN NOTES");
  res.sendFile('public/notes.html', err => {
    err ? console.log(err) : console.log("Sent");
  });
});

// GET notes
app.get('/api/notes', (req, res) => {
res.json(notes);
})
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname,'public/index.html'));
// });
// app.get('/api/notes', (req, res) => {
//   notesFile.getNotes()
//   .then((notes) => {
//     return res.json(notes);
//   })
// });

// // read by id
// app.post('/api/notes', (req, res) => {
//   notesFile.getNotes().create(req.body)
//   res.sendStatus(200);

//   return res.status(500).send(error);
// });

// app.delete('/api/notes/:id', (req, res) => {
//   notesFile.getNotes().deleteById(req.params.id)
//     return res.json(notes);
// });



app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});