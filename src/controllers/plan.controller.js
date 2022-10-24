const planCtrl = {}
const Plan = require('../models/plan.model');
const Descuento = require('../models/descuento.model');

planCtrl.listarPlanes = async(req,res)=>{
    /* const descuento = await Descuento.find({activo:true});
    const sinDescuentos = await Plan.find({id: {$ne: descuento.idPlan}});
    res.json(sinDescuentos); */
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

/* function verificarNormales(){
    const descuento = Descuento.find({activo:true});
    const sinDescuentos = Plan.find({});
    return sinDescuentos;
} */


module.exports = planCtrl;