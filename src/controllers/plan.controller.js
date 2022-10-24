const planCtrl = {}
const Plan = require('../models/plan.model');

planCtrl.listarPlanes = async(req,res)=>{
    const planes = await Plan.find();
    res.json(planes);
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

module.exports = planCtrl;