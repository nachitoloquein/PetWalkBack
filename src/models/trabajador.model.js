//Declarar las importaciones
const { Schema , model } = require('mongoose');
//Genero el modelo
const trabajadorSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    comuna: {type: String, required: true},
    solicitudPendiente: {type: Boolean, required: true},
    genero: {type: String, required: true}
},{
    versionKey: false
})
//Exporto el modelo completo

module.exports = model('trabajador', trabajadorSchema);