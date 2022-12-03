const ctrlHorario = {}

const Horario = require('../models/horario.model');

ctrlHorario.crearHoras = async(req,res)=>{
    try{
        const {idTrabajador, horaIntervalos} = req.body;
        const newHora = new Horario({idTrabajador, horaIntervalos});
        await newHora.save();
        res.status(200).send({message: 'hora creada', newHora});
    }catch(err){
        console.log(err);
    }
}

ctrlHorario.listarHorasDeUnTrabajadorDisponible = async(req,res)=>{
    try{
        const horasTrabajador = await Horario.find({idTrabajador:req.params.id, disponible: true})
        res.json(horasTrabajador);
    }catch(err){
        console.log(err);
    }
}

ctrlHorario.marcarOcupada = async(idHora)=>{
    try{
        await Horario.findByIdAndUpdate(idHora, { $set:{disponible: false}});
    }catch(err){
        console.log(err);
    }
}

ctrlHorario.eliminarHora = async(req,res)=>{
    try{
        await Horario.findByIdAndDelete(req.params.id);
        res.status(200).send({message: 'eliminado correctamente'});
    }catch(err){
        console.log(err);
    }
}

module.exports = ctrlHorario;