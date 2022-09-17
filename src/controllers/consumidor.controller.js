const consumidorCtrl= {};

const Consumidor = require('../models/consumidor.model');
const bcrypt = require('bcrypt');
const funciones = require('../helpers/functions.helpers');

consumidorCtrl.Registro = async(req, res)=>{
    try{
        const {nombre, apellido, comuna, telefono, correo, contrasena, direccion, fechaNacimiento } = req.body;
        //validamos que rellene todo
        if (!(nombre && apellido && comuna && telefono && correo && contrasena && direccion && fechaNacimiento)) {
            return res.status(400).send("Debe rellenar todos los campos");
          }
        //verificamos si existe dentro de la bdd
        const usuarioExistente = await Consumidor.findOne({correo});
        if(usuarioExistente){
           return res.status(409).send({message: 'correo electrónico existente'});
        }
        //encriptamos la contraseña
        encryptedPassword = await bcrypt.hash(contrasena, 10);
        const newConsumidor = {nombre: funciones.capitalizar(nombre), apellido: funciones.capitalizar(apellido), comuna, telefono, correo, contrasena: encryptedPassword, direccion, fechaNacimiento};
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

module.exports= consumidorCtrl;
