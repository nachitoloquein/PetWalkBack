const {Schema, model} = require('mongoose')

const planSchema = new Schema({
    costo: {type: Number, required: true},
    encabezado: {type: String, required: true},
    descripcion: {type: String, required: true},
    cantidadCoins: {type: Number, required: true},
    activo: {type: Boolean, required: true, default: true}
},
{
    versionKey: false
})

module.exports = model('plan', planSchema)