const { Schema , model, default: mongoose }= require('mongoose');

const SchemaBilletera = new Schema({
    monto: {type: Number, required: true, default: 0},
    idConsumidor: {type: Schema.Types.ObjectId, ref:'consumidor'}
},{
    versionKey: false
})

module.exports = model('billetera', SchemaBilletera)