const express = require('express');
const { json } = require('express/lib/response');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 4000)

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//Establecemos el subdominio de los WebService
app.use("/api/trabajador",require('./routes/trabajador.routes'));
//Exportamos el archivo
module.exports = app;