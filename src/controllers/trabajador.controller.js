const trabajadorCtrl = {}

const Trabajador = require('../models/trabajador.model');


trabajadorCtrl.listarSolicitud = async(req,res)=>{
    const solicitudes = await Trabajador.find({solicitudPendiente: true});
    res.json(solicitudes);
}


trabajadorCtrl.enviarSolicitud = async(req, res)=>{
try{
    const {nombre, apellido, comuna, solicitudPendiente, genero} = req.body;
    const newSolicitud = new Trabajador({nombre, apellido, comuna, solicitudPendiente, genero});
    await newSolicitud.save();

    res.send({message: 'Solicitud creada'})
}
catch(err){
    res.send({message: err});
    }
}

module.exports= trabajadorCtrl;
