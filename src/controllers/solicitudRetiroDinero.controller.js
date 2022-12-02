CtrlSolicitudRetiroDinero = {}

const SolicitudRetiroDinero = require('../models/solicitudRetiroDinero.model');

CtrlSolicitudRetiroDinero.realizarSolicitud = async(req,res)=>{
    try{
        const {idTrabajador, dineroTotal} = req.body;
        const newSolicitudRetiro = new SolicitudRetiroDinero({idTrabajador, dineroTotal});
        await newSolicitudRetiro.save();
        res.send({message: 'solicitud realizada', newSolicitudRetiro});
    }catch(err){
        res.status(400).send({message: 'error de '+err});
    }
}

CtrlSolicitudRetiroDinero.listarSolicitudes = async(req,res)=>{
    try{
        const solicitudesDinero = await SolicitudRetiroDinero.find({estadoPendiente: true});
        res.json(solicitudesDinero);
    }catch(err){
        res.status(400).send({message: 'error de '+err});
    }
}

module.exports = CtrlSolicitudRetiroDinero;