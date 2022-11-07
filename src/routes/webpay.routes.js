const { Router  } = require('express');
const router = Router();
const CtrlTransaccion = require("../controllers/webpay.controller");

router.post("/create", CtrlTransaccion.crearRespuesta);
router.post("/res", CtrlTransaccion.verEstado);
router.get("/res", CtrlTransaccion.verEstado);

module.exports = router;