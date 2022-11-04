const matchCtrl = {}

const Match = require('../models/match.model');

matchCtrl.generarMatch= async(req,res)=>{
    try{
        const {idConsumidor, idTrabajador, horaTrabajo, monto} = req.body;
        if (monto<2) return res.status(402).send('Saldo de PetCoins insuficiente');
        const newMatch = {idConsumidor, idTrabajador, horaTrabajo}
        const newObject = new Match(newMatch);
        await newObject.save();
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

module.exports = matchCtrl;