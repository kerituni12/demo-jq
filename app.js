const express = require('express');
const app = express();

app.use(express.static('public'));


const fakeDatabase = {
  'Hieu': {job: 'student' },
  'Hai': {job: 'student'},
  'Tri': {job: 'it'}
};


app.get('/users', (req, res) => {
  const allUsernames = Object.keys(fakeDatabase); 
  console.log('allUsernames is:', allUsernames);
  res.send(allUsernames);
});



app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; 
  const val = fakeDatabase[nameToLookup];
  console.log(nameToLookup, '->', val); 
  if (val) {
    res.send(val);
  } else {
    res.send({}); 
  }
});

// start the server at URL: http://localhost:3000/
app.listen(process.env.PORT || 3000, () => {
  console.log('Server started at http://localhost:3000/');
});