//Declarar las importaciones
const { Schema , model } = require('mongoose');
//Genero el modelo
const trabajadorSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    comuna: {type: String, required: true},
    solicitudPendiente: {type: Boolean, required: true, default: true},
    genero: {type: String, required: true},
    telefono: {type: String, required: true},
    correo: {type: String, required: true},
    contrasena: {type: String, required: true},
    rut: {type: String, required:true},
    direccion: {type: String, required: true},
    activo: {type: Boolean, required: true, default: false},
    fechaNacimiento: {type: String, required: true},
    documentos: {type: Array, required: true},
},{
    versionKey: false
})
//Exporto el modelo completo

module.exports = model('trabajador', trabajadorSchema);