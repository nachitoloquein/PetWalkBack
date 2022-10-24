const planCtrl = {}

const Plan = require('../models/plan.model');
const mongoose = require('mongoose');

planCtrl.listarPlanes = async(req,res)=>{
    try{
        const planes = await Plan.find({activo: true});
        res.json(planes);

    }catch(error){
        res.send({message: 'error'+ error});
    }
}

planCtrl.CrearDescuento = async(req,res)=>{
    try{
        const {costoNuevo, fechaTermino} = req.body;
        await Plan.findByIdAndUpdate(req.params.id, {costoNuevo,fechaTermino});
        const planSeleccionado = await Plan.findById(req.params.id);
        const porcentaje = sacarPorcentaje(planSeleccionado.costo,costoNuevo);
        await Plan.findByIdAndUpdate(req.params.id, {$set: {porcentajeDescuento: '%'+porcentaje, descuentoActivo: true}});
        res.send({message: 'Descuento creado'});
    }catch(error){
        res.send({message: 'error de '+ error})
    }
}

planCtrl.crearPlan = async(req,res)=>{
    try{
    const {costo, encabezado, descripcion, cantidadCoins} = req.body;
    const newPlan = new Plan({costo, encabezado, descripcion, cantidadCoins});
    await newPlan.save();
    res.send({message: "plan creado", newPlan});
    }catch(e){
        console.log(e);
        res.status(400).send({message: `error de ${e}`});
    }
}

planCtrl.eliminarPlan = async(req,res)=>{
    try{
        await Plan.findByIdAndDelete(req.params.id);
        res.json({status: 'plan eliminado'});
    }catch(e){
        console.log(e);
        res.status.send({message: `error de ${e}`});
    }
}

planCtrl.modificarPlan = async(req,res)=>{
    try{
        await Plan.findByIdAndUpdate(req.params.id, req.body);
        res.json({status: 'plan modificado'});
    }catch(e){
        res.send({message: `error de ${e}`});
    }
}

planCtrl.desactivarPlan = async(req,res)=>{
    try{
        await Plan.findByIdAndUpdate(req.params.id,{ $set: {activo: false } });
        res.json({status: 'Plan desactivado'})
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

function sacarPorcentaje(valorInicial, valorFinal){
    const porcentaje = 100-(valorFinal/valorInicial*100);
    return porcentaje;
}


module.exports = planCtrl;