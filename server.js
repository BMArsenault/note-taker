const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notesFile = require("./db/notesFile");

// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');


// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.get('/api/notes', (req,res) => {
    res.json(notes);
});

// Delete a candidate
// app.delete('/api/notes/:id', (req, res) => {
//     const sql = `DELETE FROM notes WHERE id = ?`;
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.statusMessage(400).json({ error: res.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'Notes not found'
//         });
//       } else {
//         res.json({
//           message: 'deleted',
//           changes: result.affectedRows,
//           id: req.params.id
//         });
//       }
//     });
// });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});