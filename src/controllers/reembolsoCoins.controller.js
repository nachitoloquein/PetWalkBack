const reembolsoCoinsCtrl = {}

const Match = require('../models/match.model');
const Billetera = require('../models/billeteraConsumidor.model');

reembolsoCoinsCtrl.cancelarTrabajo = async(req,res)=>{
    try{
        const match = await Match.findById(req.params.id);
        await match.update({$set:{estadoTrabajo: 'Cancelado'}});
        await Billetera.findOneAndUpdate({idConsumidor: match.idConsumidor}, {$set:{monto: +1}})
        res.status(200).send({message: 'cancelado correctamente'})
    }catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

module.exports = reembolsoCoinsCtrl;