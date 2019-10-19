const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const body = require('body-parser');
var jsonfile = require('jsonfile');
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(express.static('public'));
app.use(body.json());

// read fakeDatabase
var fakeDatabase = {};
jsonfile.readFile('./data.json', function (err, obj) {
  if (err) console.error(err)
  fakeDatabase = obj;
});

/* 
  Router
*/

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/users', (req, res) => {
  const allUsernames = Object.entries(fakeDatabase);
  res.send(allUsernames);
});

app.get('/users/:userid', (req, res) => {
  const id = req.params.userid;
  const val = fakeDatabase[id];
  //console.log(val);
  if (val) {

    //delay res
    setTimeout(function () {
      res.send(val);
    }, 600); 
    
  } else {
    res.send({});
  }
});

app.post('/users/:userid', function (req, res) {

  const id = req.params.userid;

  const name = req.body.name;
  const job = req.body.job;
  const des = req.body.des;

  var imageFile = req.files ? 'have file' : "";

  //set data
  fakeDatabase[id].name = name;
  fakeDatabase[id].job = job;
  fakeDatabase[id].des = des;

  // check img
  if (imageFile != "") {
    var Image = req.files.image;
    var path = __dirname + '/public/img/' + Image.name;

    // upload file to path
    Image.mv(path, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
    // set data
    fakeDatabase[id].img = Image.name;
  }

  // write data to json file
  jsonfile.writeFile('./data.json', fakeDatabase, function (err) {
    if (err) throw err;
  });

  // sent to run code after ajax
  res.send({});
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started at http://localhost:3000/');
});