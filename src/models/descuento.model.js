const {Schema, model} = require('mongoose')

const descuentoSchema = new Schema({
    costoNuevo: {type: Number, required: true},
    porcentajeDescuento: {type: String, required: true},
    idPlan: {type: String, required: true},
    fechaTermino: {type: Date, required: true},
    activo: {type: Boolean, requireed: true, default: true}
},
{
    versionKey: false
})

module.exports = model('descuentos', descuentoSchema)