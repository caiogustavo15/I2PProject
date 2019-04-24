const express = require('express');
const path = require ('path');
const http = require('http');
const https = require('https');

const app = express();

// //static folder
app.use(express.static(path.join(__dirname, 'i2project')));
////
app.get('/README.md', function(req, res) {
  res.sendFile(path.join(__dirname,'./README.md'));
});
////
const PORT = process.env.PORT || 5000 ;
//
app.listen (PORT, () => console.log(`started server port ${PORT}`));
