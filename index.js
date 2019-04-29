const express = require('express');
const path = require ('path');
const http = require('http');
const https = require('https');
const markdown = require ('markdown').markdown;
var fs = require('fs');


const app = express();

// //static folder
app.use(express.static(path.join(__dirname, 'i2project')));
////
app.get('/README.md', function(req, res) {
  // res.sendFile(path.join(__dirname,'./README.md'));
  let md = fs.readFileSync('README.md','utf8')
  let html = markdown.toHTML(md);
  res.send(html);
});

app.get('/instructions.md', function(req, res) {
  // res.sendFile(path.join(__dirname,'./README.md'));
  let md = fs.readFileSync('instructions.md','utf8')
  let html = markdown.toHTML(md);
  res.send(html);
});
////
const PORT = process.env.PORT || 5000 ;
//
app.listen (PORT, () => console.log(`started server port ${PORT}`));
