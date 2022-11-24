const ctrlValoracion = {}

const Valoracion = require('../models/valoracionTrabajador.model');

ctrlValoracion.mostrarValoracionTrabajador = async(req,res)=>{
    const valoracion = await Valoracion.findOne({idTrabajador: req.params.id});
    res.json(valoracion);
}

ctrlValoracion.calificarTrabajador = async(req,res)=>{
    try{
        const {calificacion, idTrabajador} = req.body;
        const trabajadorValorado = await Valoracion.findOne({idTrabajador});
        const calculoTotal = ((parseInt(trabajadorValorado.totalValorado) * parseInt(trabajadorValorado.cantidadValoraciones))+parseInt(calificacion))/parseInt((trabajadorValorado.cantidadValoraciones)+1);
        await trabajadorValorado.update({$set:{totalValorado: calculoTotal, cantidadValoraciones: trabajadorValorado.cantidadValoraciones+1}});
        res.send({message: 'trabajador calificado'});
    }catch(e){
        res.send({error: e});
    }
}

ctrlValoracion.crearCalificador = async(idTrabajador) =>{
    const valoracion = new Valoracion({idTrabajador: idTrabajador});
    await valoracion.save();
}

module.exports = ctrlValoracion;