//Declarar las importaciones
const { Schema , model } = require('mongoose');
//Genero el modelo
const adminSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    comuna: {type: String, required: true},
    telefono: {type: String, required: true},
    correo: {type: String, required: true},
    contrasena: {type: String, required: true},
    activo: {type: Boolean, required: true, default: false}
},{
    versionKey: false
})
//Exporto el modelo completo

module.exports = model('admin', adminSchema);