const trabajadorCtrl = {}

const Trabajador = require('../models/trabajador.model');
const funciones = require('../helpers/functions.helpers')

trabajadorCtrl.listarSolicitud = async(req,res)=>{
    const solicitudes = await Trabajador.find({solicitudPendiente: true});
    res.json(solicitudes);
}

trabajadorCtrl.enviarSolicitud = async(req, res)=>{
try{
    let paths = req.files.map(file => file.path)
    const {nombre, apellido, comuna, genero, telefono, correo, contrasena, rut, direccion, fechaNacimiento } = req.body;
     //verificamos si existe dentro de la bdd
     const usuarioExistente = await Trabajador.findOne({correo});
     if(usuarioExistente){
        return res.status(409).send({message: 'correo electrónico existente'});
     }
    const newTrabajador = {nombre: funciones.capitalizar(nombre), apellido: funciones.capitalizar(apellido), comuna, genero, telefono, correo, contrasena, rut, direccion, fechaNacimiento, documentos: paths};
    if (newTrabajador){
        const newSolicitud = new Trabajador(newTrabajador);
        await newSolicitud.save();
        res.send({message: 'Solicitud creada', newSolicitud});
    }
    else{
        return res.send({message: 'Faltan datos'});
    }
}
catch(err){
    res.send({message: 'Algo hiciste mal ' + err});
    console.log(err);
    }
}

module.exports= trabajadorCtrl;
