const express = require('express');
const { json } = require('express/lib/response');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 4000)

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//Establecemos el subdominio de los WebService
app.use("/api/trabajador",require('./routes/trabajador.routes'));
app.use("/api/comuna",require('./routes/comuna.routes'));
app.use("/api/consumidor",require('./routes/consumidor.routes'));
app.use("/api/admin",require('./routes/admin.routes'));
app.use("/api/plan",require('./routes/plan.routes'));
app.use("/api/descuento",require('./routes/descuento.routes'));

//Exportamos el archivo
app.use('/files', express.static('files'));

module.exports = app;