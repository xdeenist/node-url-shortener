const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./helpers/errorHandler');
const app = express();
const {serverPort} = require("./config.json");

app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/minify', require('./controllers/minify.controller'));
app.use('/r', require('./controllers/redirect.controller'));
app.use(errorHandler);

app.listen(serverPort || 8081);
