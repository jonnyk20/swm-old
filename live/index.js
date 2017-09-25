const express = require('express');
const compression = require('compression');
const app = express();

const oneDay = 86400000;

app.use(compression());

app.use(express.static(__dirname + '/public', { maxAge: oneDay}));

app.listen(process.env.PORT || 5000);