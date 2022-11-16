const { Schema, model } = require('mongoose');

const horarioSchema = new Schema({
    idTrabajador: {type: Schema.Types.ObjectId, ref: 'trabajador', required: true},
    horaIntervalos: {type: String, required: true},
    disponible: {type: Boolean, required: true, default: true}
},{
    versionKey: false   
})

module.exports = model('horario', horarioSchema)