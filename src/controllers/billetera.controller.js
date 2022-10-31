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

CtrlBilletera.cargarCoinsIdBill = async(req,res)=>{
    try {
        const consumidorCoins = await Billetera.findById(req.params.id);
        const cargaCoins = consumidorCoins.monto + req.body.monto;
        console.log(consumidorCoins)
        await Billetera.findByIdAndUpdate(req.params.id,{$set: {monto:cargaCoins}});
        res.status(200).send({status: 'Se cargaron coins correctamente'});
    } catch (error) {
        console.log(error)
    }
}

CtrlBilletera.cargarCoinsIdUsuario = async(req,res)=>{
    try {
        const consumidorCoins = await Billetera.find({idConsumidor:req.params.id});
        const cargaCoins = consumidorCoins[0].monto + req.body.monto;
        await Billetera.findOneAndUpdate({idConsumidor:req.params.id},{$set: {monto:cargaCoins}})
        res.status(200).send({status: 'Se cargaron coins correctamente'});
    } catch (error) {
        console.log(error)
    }
}

module.exports = CtrlBilletera