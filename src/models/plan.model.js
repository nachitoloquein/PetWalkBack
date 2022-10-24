const {Schema, model} = require('mongoose')

const planSchema = new Schema({
    costo: {type: Number, required: true},
    encabezado: {type: String, required: true},
    descripcion: {type: String, required: true},
    cantidadCoins: {type: Number, required: true},
    costoNuevo: {type: Number, required: false},
    porcentajeDescuento: {type: String, required: false},
    fechaTermino: {type: Date, required: true},
    activo: {type: Boolean, required: true, default: true},
    descuentoActivo: {type: Boolean, required: false, default: false}
},
{
    versionKey: false
})

module.exports = model('plan', planSchema)