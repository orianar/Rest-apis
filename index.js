const express= require('express');
const routes= require('./routes');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
// Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require ('cors');


// Conectar mongo
mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
});

// Crear el servidor
const app= express();

// Habilitar cors
app.use(cors())

// Habilitar el bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('uploads'));

// puerto
app.listen(5000);