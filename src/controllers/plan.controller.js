const planCtrl = {}

const Plan = require('../models/plan.model');

planCtrl.listarPlanes = async(req,res)=>{
    try{
        const planes = await Plan.find({activo: true});
        res.json(planes);

    }catch(error){
        res.send({message: 'error'+ error});
    }
}

planCtrl.crearPlan = async(req,res)=>{
    try{
    const {costo, encabezado, descripcion, cantidadCoins} = req.body;
    const newPlan = new Plan({costo, encabezado, descripcion, cantidadCoins});
    await newPlan.save();
    res.status(200).send({message: "plan creado", newPlan});
    }catch(e){
        console.log(e);
        res.status(400).send({message: `error de ${e}`});
    }
}

planCtrl.eliminarPlan = async(req,res)=>{
    try{
        await Plan.findByIdAndDelete(req.params.id);
        res.status(200).send({status: 'plan eliminado'});
    }catch(e){
        console.log(e);
        res.status.send({message: `error de ${e}`});
    }
}

planCtrl.modificarPlan = async(req,res)=>{
    try{
        await Plan.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({status: 'plan modificado'});
    }catch(e){
        res.send({message: `error de ${e}`});
    }
}

planCtrl.desactivarPlan = async(req,res)=>{
    try{
        await Plan.findByIdAndUpdate(req.params.id,{ $set: {activo: false } });
        res.status(200).send({status: 'Plan desactivado'})
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

function sacarPorcentaje(valorInicial, valorFinal){
    const porcentaje = 100-(valorFinal/valorInicial*100);
    return Math.round(porcentaje);
}

planCtrl.CrearDescuento = async(req,res)=>{
    try{
        const {costoNuevo, fechaTermino} = req.body;
        await Plan.findByIdAndUpdate(req.params.id, {costoNuevo,fechaTermino});
        const planSeleccionado = await Plan.findById(req.params.id);
        const porcentaje = sacarPorcentaje(planSeleccionado.costo,costoNuevo);
        await Plan.findByIdAndUpdate(req.params.id, {$set: {porcentajeDescuento: '%'+porcentaje, descuentoActivo: true}});
        res.status(200).send({message: 'Descuento creado'});
    }catch(error){
        res.status(400).send({message: 'error de '+ error})
    }
}

planCtrl.DarDeBajaManualDescuento = async(req,res)=>{
    try{
        await Plan.findByIdAndUpdate(req.params.id,{ $set: {descuentoActivo: false } });
        res.status(200).send({status: 'Descuento desactivado'});
    }
    catch(err){
        res.status(400).send({message:  'ha ocurrido un error de '+ err});
    }
}

planCtrl.DarDeBajaAutomatica = async()=>{
    const planesConDescuento = await Plan.find({descuentoActivo:true});
}

module.exports = planCtrl;