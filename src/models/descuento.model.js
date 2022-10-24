const {Schema, model} = require('mongoose')

const descuentoSchema = new Schema({
    costoNuevo: {type: Number, required: true},
    porcentajeDescuento: {type: String, required: true},
    idPlan: {type: Schema.Types.ObjectId, ref:'plan', required: true},
    fechaTermino: {type: Date, required: true},
    activo: {type: Boolean, required: true, default: true}
},
{
    versionKey: false
})

module.exports = model('descuento', descuentoSchema)