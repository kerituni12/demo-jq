const express = require('express');
const app = express();

app.use(express.static('public'));


const fakeDatabase = {
  'Hieu': {job: 'student', pet: 'cat.jpg'},
  'Hai': {job: 'student',   pet: 'dog.jpg'},
  'Tri': {job: 'student',  pet: 'bear.jpg'}
};


app.get('/users', (req, res) => {
  const allUsernames = Object.keys(fakeDatabase); // returns a list of object keys
  console.log('allUsernames is:', allUsernames);
  res.send(allUsernames);
});



app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; // matches ':userid' above
  const val = fakeDatabase[nameToLookup];
  console.log(nameToLookup, '->', val); // for debugging
  if (val) {
    res.send(val);
  } else {
    res.send({}); // failed, so return an empty object instead of undefined
  }
});

// start the server at URL: http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});