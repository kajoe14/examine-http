const path = require('path');
const express = require('express');

const app = express();

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.send('index');
});

app.get('/api/exercise', (req, res) => {
  res.status(200).send('This is the exercise page...');
});

// Individual params
app.get('/api/exercises/:name/:occupation/:place_of_birth', (req, res) => {
  const profile = {
    name: req.params.name,
    occupation: req.params.occupation,
    placeOfBirth: req.params.place_of_birth
  };

  res.status(200).send(`<h3>Profile Info:</h3><h4>Name: ${profile.name}</h4><p>Ocuupation: ${profile.occupation}</h4><h4>Place of Birth: ${profile.placeOfBirth}</h4> `);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

