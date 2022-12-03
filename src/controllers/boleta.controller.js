const boletaCtrl= {};
const Boleta = require('../models/boleta.model');

boletaCtrl.guardarBoleta = async(req,res)=>{
    try{
        const {idConsumidor, cantidadCoins, totalPagado, fechaCompra} = req.body;
        const newBoleta = new Boleta({idConsumidor, cantidadCoins, totalPagado, fechaCompra});
        await newBoleta.save();
        res.status(200).send({'message': 'boletaCreada', newBoleta});
    }catch(e){
        res.send({'a ocurrido un error de': e});
    }
}

boletaCtrl.verBoletas = async(req,res)=>{
    try{
        const boletas = await Boleta.find();
        res.json(boletas);
    }catch(e){
        res.send({'a ocurrido un error de': e});
    }
}

boletaCtrl.boletaFiltroFecha = async(req,res)=>{
    try {
        const fechaActual = Date.now();
        const boletas = await Boleta.find({fechaCompra:{"$gte": fechaActual-7 * 24 * 3600 * 1000, "$lt": fechaActual}});
        res.json(boletas)

    } catch (error) {
        console.log(error)
    }
}

module.exports = boletaCtrl;