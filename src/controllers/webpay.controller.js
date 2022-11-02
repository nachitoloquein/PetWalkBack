const CtrlTransaccion = {}
const WebpayPlus = require('transbank-sdk').WebpayPlus

CtrlTransaccion.crearRespuesta=async(req,res)=>{
    try{
        const { costo } = req.body;
        const createResponse = await (new WebpayPlus.Transaction()).create(
            'orden1', 
            'sesion', 
            costo, 
            'http://localhost:4000/api/webpay/res'
        );
        res.send(createResponse);
    }catch(e){
        console.log(e);
    }
}

CtrlTransaccion.verEstado = async(req,res)=>{
  let token = req.query.token_ws;
  const commitResponse = await (new WebpayPlus.Transaction()).commit(token);
  console.log(commitResponse)
  if(commitResponse.response_code == 0){
    res.redirect('http://localhost:8100/transaccionBuena');
  }
  else{
    //no paso
    res.redirect('http://www.facebook.com');
  }
}

module.exports = CtrlTransaccion;