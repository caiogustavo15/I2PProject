const express = require('express');
const path = require ('path');

const app = express();

// //static folder
app.use(express.static(path.join(__dirname, 'i2project')));
//
const PORT = process.env.PORT || 5000 ;
//
app.listen (PORT, () => console.log(`started server port ${PORT}`));
