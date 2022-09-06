const comunasCtrl = {}
const Comuna = require('../assets/comunas.json')

comunasCtrl.listarComuna = async(req, res)=>{
    res.json(Comuna);
}

module.exports = comunasCtrl;