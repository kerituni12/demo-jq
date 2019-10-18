const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const body = require('body-parser');
var jsonfile = require('jsonfile');


app.use(fileUpload());
app.use(express.static('public'));
app.use(body.json());

var fakeDatabase = {};
jsonfile.readFile('./data.json', function (err, obj) {
  if (err) console.error(err)  
  fakeDatabase = obj;
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
    res.send(val);
  } else {
    res.send({}); 
  }
});

app.post('/users/:userid', function(req, res) {
 
	const id = req.params.userid;

  const name = req.body.name;
  const job = req.body.job;
  const des = req.body.des;

  var imageFile = req.files ? 'have file' : "";

  // if(req.files) imageFile = 'have file';
  // else imageFile = "";

  fakeDatabase[id].name = name;
  fakeDatabase[id].job = job;
  fakeDatabase[id].des = des;
  
  if (imageFile != "") {
    var Image = req.files.image;
    var path = __dirname + '/public/img/' + Image.name;

    Image.mv(path, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
    fakeDatabase[id].img = Image.name;
  }

  jsonfile.writeFile('./data.json', fakeDatabase, function(err) {
    if (err) throw err; 
  });	

  res.send('ok');
  //res.redirect('back');
  //res.render('index');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started at http://localhost:3000/');
});