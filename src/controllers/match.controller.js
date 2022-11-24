const matchCtrl = {}

const Match = require('../models/match.model');
const billeteraCtrl = require('./billetera.controller');
const horarioCtrl = require('./horario.controller');

matchCtrl.generarMatch= async(req,res)=>{
    try{
        const {idConsumidor, idTrabajador, monto} = req.body;
        const idHoraTrabajo = req.params.id;
        if (monto<1) return res.status(402).send('Saldo de PetCoins insuficiente');
        const newMatch = {idConsumidor, idTrabajador, idHoraTrabajo};
        const newObject = new Match(newMatch);
        await newObject.save();
        res.status(200).send({'message': 'objeto creado', newObject});
<<<<<<< HEAD
        billeteraCtrl.restarCoinsMatch(idConsumidor);
=======
        billeteraCtrl.restarCoinsMatch(idConsumidor, monto);
        horarioCtrl.marcarOcupada(idHoraTrabajo);
>>>>>>> c36e1b89d77dd9bf05edc3370b84c20a73bb745e
    }catch(err){
        res.status(400).send({'message':err});
    }
}

matchCtrl.obtenerTodos= async(req,res)=>{
    try{
        const matches = await Match.find();
        res.json(matches)
    }catch(err){
        res.status(400).send({'message':err});
    }
}

matchCtrl.verMatchesConsumidor= async(req,res)=>{
    try{
        const matches = await Match.find({idConsumidor: req.params.id, estadoTrabajo: 'Pendiente'}).populate('idTrabajador').populate('idHoraTrabajo');
        res.json(matches)
    }catch(err){
        res.status(400).send({'message':err});
    }
}

matchCtrl.verMatchesTrabajador= async(req,res)=>{
    try{
<<<<<<< HEAD
        const matches = await Match.find({idTrabajador: req.params.id});
=======
        const matches = await Match.find({idTrabajador: req.params.id, estadoTrabajo: 'Pendiente'}).populate('idConsumidor').populate('idHoraTrabajo');
        res.json(matches)
    }catch(err){
        res.status(400).send({'message':err});
    }
}

matchCtrl.verHistorialConsumidor= async(req,res)=>{
    try{
        const matches = await Match.find({idConsumidor: req.params.id}).populate('idTrabajador').populate('idHoraTrabajo');
        res.json(matches)
    }catch(err){
        res.status(400).send({'message':err});
    }
}

matchCtrl.verHistorialTrabajador= async(req,res)=>{
    try{
        const matches = await Match.find({idTrabajador: req.params.id}).populate('idConsumidor').populate('idHoraTrabajo');
>>>>>>> c36e1b89d77dd9bf05edc3370b84c20a73bb745e
        res.json(matches)
    }catch(err){
        res.status(400).send({'message':err});
    }
}

matchCtrl.finalizarTrabajo = async(req,res)=>{
    try{
        const match = await Match.findById(req.params.id);
        await match.update({$set:{estadoTrabajo: 'Finalizado'}});
        res.send({message: 'finalización exitosa'});
    }catch(err){
        res.send({message: err});
    }
}

module.exports = matchCtrl;