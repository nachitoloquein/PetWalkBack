const trabajadorCtrl = {}

const Trabajador = require('../models/trabajador.model');


trabajadorCtrl.listarSolicitud = async(req,res)=>{
    const solicitudes = await Trabajador.find({solicitudPendiente: true});
    res.json(solicitudes);
}

trabajadorCtrl.enviarSolicitud = async(req, res)=>{
try{
    const {nombre, apellido, comuna, genero, telefono, correo, contrasena, rut, direccion, fechaNacimiento} = req.body;
    const newSolicitud = new Trabajador({nombre, apellido, comuna, genero, telefono, correo, contrasena, rut, direccion, fechaNacimiento});
    await newSolicitud.save();

    res.send({message: 'Solicitud creada'})
    console.log(newSolicitud);
}
catch(err){
    res.send({message: err});
    }
}

module.exports= trabajadorCtrl;
