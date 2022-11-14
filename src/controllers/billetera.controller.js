CtrlBilletera = {}

const Billetera = require('../models/billeteraConsumidor.model');
const { findById } = require('../models/plan.model');

CtrlBilletera.crearBilletera = async(id)=>{
    const newBilletera = new Billetera({idConsumidor: id});
    await newBilletera.save();
}

CtrlBilletera.mostrarDatos = async(req, res)=>{
    const billetera = await Billetera.findOne({idConsumidor: req.params.id});
    res.send(billetera);
}

CtrlBilletera.cargarCoinsIdUsuario = async(req,res)=>{
    try {
        const consumidorCoins = await Billetera.find({idConsumidor:req.params.id});
        const cargaCoins = parseInt(consumidorCoins[0].monto) + parseInt(req.body.monto);
        await Billetera.findOneAndUpdate({idConsumidor:req.params.id},{$set: {monto:cargaCoins}})
        res.status(200).send({status: 'Se cargaron coins correctamente'});
    } catch (error) {
        console.log(error)
    }
}

CtrlBilletera.restarCoinsMatch= async(id)=>{
    try{
        const billetera = await Billetera.findById(id);
        const totalActual = billetera.monto;
        billetera.update({$set:{monto: totalActual-1}});
    }catch(e){
        console.log(e);
    }
}
module.exports = CtrlBilletera