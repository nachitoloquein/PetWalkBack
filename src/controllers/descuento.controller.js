const CtrlDescuento = {}

const Descuento = require('../models/descuento.model');
const Plan = require('../models/plan.model');

CtrlDescuento.listarDescuentos = async(req,res)=>{
    try{ 
        const planesDescuentos = await Descuento.find({activo:true}).populate('idPlan');
        res.json(planesDescuentos);
    }catch(err){
        res.status(404);
    }
}

CtrlDescuento.CrearDescuento = async(req,res)=>{
    try{
        const {costoNuevo, idPlan, fechaTermino} = req.body;
        const plan = await Plan.findById(idPlan);
        const porcentaje = sacarPorcentaje(plan.costo,costoNuevo);
        const newDescuento = new Descuento({costoNuevo, porcentajeDescuento: `%${porcentaje}`, idPlan, fechaTermino});
        await newDescuento.save();
        res.send({message: 'Descuento creado', newDescuento});
    }catch(error){
        res.send({message: 'error de '+ error})
    }
}

CtrlDescuento.DarDeBajaAutomatico = () =>{
   /*  try{
        const fechas = Descuento.where(
        )
        while
    }catch(error){
        console.log(error);
    } */
    let cosa = false;
    while(cosa==false){
        console.log('se esta ejecutando');
        cosa = true;
    }
}

CtrlDescuento.DarDeBajaManual = async(req,res)=>{
    try{
        await Descuento.findByIdAndUpdate(req.params.id,{ $set: {activo: false } });
        res.json({status: 'Descuento desactivado'});
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

CtrlDescuento.Eliminar = async(req,res)=>{
    try{
        await Descuento.findByIdAndDelete(req.params.id);
        res.json({status:'Descuento Eliminado de la bdd'});
    }catch(error){
        res.status.send({message: 'error'+error});
    }
}

function sacarPorcentaje(valorInicial, valorFinal){
    const porcentaje = 100-(valorFinal/valorInicial*100);
    return porcentaje;
}

module.exports= CtrlDescuento;