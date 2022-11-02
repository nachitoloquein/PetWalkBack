CtrlReporte = {}

const Reporte = require('../models/reporte.model');

CtrlReporte.mostrarReporte = async(req,res)=>{
    const reportes = await Reporte.find();
    res.json(reportes);
}

CtrlReporte.reportarTrabajador= async(req,res)=>{
    try{
        const {idConsumidor, idTrabajador, descripcion} = req.body;
        const newReporte = new Reporte({idConsumidor, idTrabajador, descripcion, tipoReporte: 0});
        await newReporte.save();
        res.send({message: 'reporte creado', newReporte});
    }catch(e){
        console.log(e);
    }
}

CtrlReporte.reportarUsuario= async(req,res)=>{
    try{
        const {idConsumidor, idTrabajador, descripcion} = req.body;
        const newReporte = new Reporte({idConsumidor, idTrabajador, descripcion, tipoReporte: 1});
        await newReporte.save();
        res.send({message: 'reporte creado', newReporte});
    }catch(e){
        console.log(e);
    }
}

module.exports = CtrlReporte;