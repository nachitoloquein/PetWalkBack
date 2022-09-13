const consumidorCtrl= {};

const Consumidor = require('../models/consumidor.model');
const Bcrypt = require('bcrypt');
const Helpers = require('../helpers/functions.helpers');

consumidorCtrl.Registro = async(res, req)=>{
    try{
        const {nombre, apellido, comuna, telefono, correo, contrasena, direccion, fechaNacimiento } = req.body;
        const usuarioExistente = await Consumidor.findOne({correo});
        if(usuarioExistente){
            return res.status(409).send('Correo electrónico existente');
        }   
        const newConsumidor = {nombre: Helpers.capitalizar(nombre), apellido: Helpers.capitalizar(apellido), comuna, telefono, correo, contrasena, direccion, fechaNacimiento};
        if (newConsumidor){
            const newSolicitud = new Consumidor(newConsumidor);
            await newSolicitud.save();
            res.send({message: 'Solicitud creada', newSolicitud});
        }
        else{
            res.send({message: 'Faltan datos'});
            console.log('no pasó el if');
        }
    }
    catch(err){
        res.send({message: 'Algo hiciste mal ' + err});
        console.log(err);
    }
}