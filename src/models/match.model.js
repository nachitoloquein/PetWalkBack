const { Schema, model } = require('mongoose');

const matchSchema = new Schema({
    idConsumidor: {type: Schema.Types.ObjectId, ref: 'consumidor', required: true},
    idTrabajador: {type: Schema.Types.ObjectId, ref: 'trabajador', required: true},
    fechaCreacion: {type: Date, required: true, default: Date.now()},
    horaTrabajo: {type: String, required: true},
    valorPaseo: {type: Number, required: true, default: 2},
    estadoTrabajo: {type: String, required: true, default: 'Pendiente'},
    fotoPruebaUrl: {type: String, required: false}
},{
    versionKey: false   
})

module.exports = model('match', matchSchema)