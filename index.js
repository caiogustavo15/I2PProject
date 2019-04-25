const express = require('express');
const path = require ('path');
const http = require('http');
const https = require('https');
const markdown = require ('markdown').markdown;
var fs = require('fs');

let tet = fs.readFileSync('README.md','utf8')
let tt = markdown.toHTML(tet);

const app = express();

// //static folder
app.use(express.static(path.join(__dirname, 'i2project')));
////
app.get('/README.md', function(req, res) {
  // res.sendFile(path.join(__dirname,'./README.md'));
  res.send(tt);
});
////
const PORT = process.env.PORT || 5000 ;
//
app.listen (PORT, () => console.log(`started server port ${PORT}`));
