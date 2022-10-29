CtrlBilletera = {}

const Billetera = require('../models/billeteraConsumidor.model')

CtrlBilletera.crearBilletera = async(id)=>{
    const newBilletera = new Billetera({idConsumidor: id});
    await newBilletera.save();
}

CtrlBilletera.mostrarDatos = async(req, res)=>{
    const billetera = await Billetera.findOne({idConsumidor: req.params.id});
    res.send(billetera);
}

module.exports = CtrlBilletera