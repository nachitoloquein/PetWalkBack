//Declarar las importaciones
const { Schema , model } = require('mongoose');
//Genero el modelo
const solicitudRetiroDineroSchema = new Schema({
    idTrabajador: {type: Schema.Types.ObjectId, ref: 'trabajador', required: true},
    dineroTotal: {type: String, required: true},
    estadoPendiente: {type: Boolean, required: true, default: true}
},{
    versionKey: false
})
//Exporto el modelo completo

module.exports = model('solicitudRetiroDinero', solicitudRetiroDineroSchema);