const { Router  } = require('express');
const router = Router();
const CtrlTransaccion = require("../controllers/webpay.controller");

router.post("/create", CtrlTransaccion.crearRespuesta);

module.exports = router;