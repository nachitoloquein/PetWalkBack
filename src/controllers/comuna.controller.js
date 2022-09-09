const comunasCtrl = {}
const Comuna = require('../assets/comunas.json')

comunasCtrl.listarComuna = async(req, res)=>{
    res.send(Comuna);
}

module.exports = comunasCtrl;