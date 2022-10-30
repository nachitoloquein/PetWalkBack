const { Router  } = require('express');
const router = Router();
const CtrlTransaccion = require("../controllers/webpay.controller");

router.post("/create", CtrlTransaccion.crearRespuesta);
router.post("/confirmar", CtrlTransaccion.confirmar)

module.exports = router;