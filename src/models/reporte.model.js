const { Schema, model } = require('mongoose');

const reporteSchema = new Schema({
    idConsumidor: {type: Schema.Types.ObjectId, ref: 'consumidor', required: true},
    idTrabajador: {type: Schema.Types.ObjectId, ref: 'trabajador', required: true},
    descripcion: {type: String,required: true },
    tipoReporte: {type: Number, required: true} //0 para reportar Trabajador; 1 para reportar Usuario
},{
    versionKey: false
})

module.exports = model('reporte', reporteSchema)