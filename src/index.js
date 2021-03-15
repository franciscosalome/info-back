const env = 'dev'

const LOCALSETTINGS = require('../localsettings.json')
const PORT = LOCALSETTINGS[`SERVER_PORT_${env}`]

const express = require('express');
const cors =require('cors');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(PORT || 3333);