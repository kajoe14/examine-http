const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');

app.post('/', urlencodedParser, (req, res) => {
  console.log(req.body);
  res.render('index');
});


// Bonus params
app.get('/profile/:name/:occupation/:place_of_birth', (req, res) => {
  const profile = {
    name: req.params.name,
    occupation: req.params.occupation,
    placeOfBirth: req.params.place_of_birth
  };

  res.render('profile', { name: profile.name, occupation: profile.occupation, placeOfBirth: profile.placeOfBirth });
});


// Advanced query params
app.get('/home', (req, res) => {
  console.log(req.query);
  res.render('home', { qs: req.query });
});


// Post Method 
app.post('/home', urlencodedParser, (req, res) => {
  console.log(req.body);
  res.render('form-2', {data: req.body} )
});


// Login 
app.post('/login', (req, res) => {
  // error handling
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
  };

  const auth = Joi.validate(req.body, schema);

  if(auth.error) {
    res.status(404).render('login-success', { data: req.body} );
    return;
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`))