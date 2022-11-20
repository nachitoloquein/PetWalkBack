const { Schema, model } = require('mongoose');

const valoracionSchema = new Schema({
    idTrabajador: {type: Schema.Types.ObjectId, ref: 'trabajador', required: true},
    totalValorado: {type: Number ,required: true, default: 0 },
    cantidadValoraciones: {type: Number, required: true, default: 0}
},{
    versionKey: false
})

module.exports = model('valoracion', valoracionSchema)