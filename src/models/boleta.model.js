const { Schema, model } = require('mongoose');

const boletaSchema = new Schema({
    idConsumidor: {type: Schema.Types.ObjectId, ref: 'consumidor', required: true},
    cantidadCoins: {type: Number, required: true},
    totalPagado: {type: Number, required:true},
    fechaCompra: {type: Date, required:true}
},{
    versionKey: false   
})

module.exports = model('boleta', boletaSchema)