const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');
const {v4: uuidv4} = require('uuid');
//const router = require('express').Router()

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.post('/api/notes', (req, res) => {
  if(!req.body.id) {
    req.body.id = uuidv4();
  }
  notes.push(req.body)
  fs.writeFileSync('./db/db.json', JSON.stringify(notes))
  res.sendStatus(200);
});

app.delete('/api/notes/:id', (req, res) => {
  var newNotes = notes.map((item) => { return item.id; }).indexOf(req.params.id); //find the index of :id
  if(newNotes === -1) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }
  var result = notes.splice(newNotes,1);
  fs.writeFile('./db/db.json', JSON.stringify(result), function(err){
   if(err) throw err;
   res.json(true);
  });
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});