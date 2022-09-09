const trabajadorCtrl = {}

const Trabajador = require('../models/trabajador.model');
const path = require('path');

trabajadorCtrl.listarSolicitud = async(req,res)=>{
    const solicitudes = await Trabajador.find({solicitudPendiente: true});
    res.json(solicitudes);
}

trabajadorCtrl.enviarSolicitud = async(req, res)=>{
try{
    let paths = req.files.map(file => file.path)
    const {nombre, apellido, comuna, genero, telefono, correo, contrasena, rut, direccion, fechaNacimiento } = req.body;
    const newTrabajador = {nombre, apellido, comuna, genero, telefono, correo, contrasena, rut, direccion, fechaNacimiento, documentos: paths};
    const newSolicitud = new Trabajador(newTrabajador);
    await newSolicitud.save();
    res.send({message: 'Solicitud creada', newSolicitud});
}
catch(err){
    res.send({message: 'Algo hiciste mal ' + err});
    console.log(err);
    }
}

module.exports= trabajadorCtrl;
