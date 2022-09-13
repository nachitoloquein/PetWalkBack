const trabajadorCtrl = {}

const Trabajador = require('../models/trabajador.model');
const Helpers = require('../helpers/functions.helpers')

trabajadorCtrl.listarSolicitud = async(req,res)=>{
    const solicitudes = await Trabajador.find({solicitudPendiente: true});
    res.json(solicitudes);
}

trabajadorCtrl.enviarSolicitud = async(req, res)=>{
try{
    let paths = req.files.map(file => file.path)
    const {nombre, apellido, comuna, genero, telefono, correo, contrasena, rut, direccion, fechaNacimiento } = req.body;
    Helpers.validarExistente(Trabajador, correo);
    const newTrabajador = {nombre: Helpers.capitalizar(nombre), apellido: Helpers.capitalizar(apellido), comuna, genero, telefono, correo, contrasena, rut, direccion, fechaNacimiento, documentos: paths};
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
