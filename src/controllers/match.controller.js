const matchCtrl = {}

const Match = require('../models/match.model');
const billeteraCtrl = require('./billetera.controller')

matchCtrl.generarMatch= async(req,res)=>{
    try{
        const {idConsumidor, idTrabajador, horaTrabajo, monto} = req.body;
        if (monto<1) return res.status(402).send('Saldo de PetCoins insuficiente');
        const newMatch = {idConsumidor, idTrabajador, horaTrabajo}
        const newObject = new Match(newMatch);
        await newObject.save();
        res.status(200).send({'message': 'objeto creado', newObject});
        billeteraCtrl.restarCoinsMatch(idConsumidor);
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
        const matches = await Match.findOne({idConsumidor: req.params.id});
        res.json(matches)
    }catch(err){
        res.status(400).send({'message':err});
    }
}

matchCtrl.verMatchesTrabajador= async(req,res)=>{
    try{
        const matches = await Match.findOne({idTrabajador: req.params.id});
        res.json(matches)
    }catch(err){
        res.status(400).send({'message':err});
    }
}

matchCtrl.finalizarTrabajo = async(req,res)=>{
    try{
        const {fotoPruebaUrl} = req.body;
        const match = await Match.findById(req.params.id);
        await match.update({$set:{estadoTrabajo: 'Finalizado', fotoPruebaUrl: fotoPruebaUrl}});
        res.send({message: 'finalización exitosa'});
    }catch(err){
        res.send({message: err});
    }
}

module.exports = matchCtrl;