const Billetera = require('../models/billeteraConsumidor.model')

async function crearBilletera(id){
    const newBilletera = new Billetera({idConsumidor: id});
    await newBilletera.save();
}

module.exports = {crearBilletera}