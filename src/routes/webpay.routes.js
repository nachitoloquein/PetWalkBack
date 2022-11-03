const { Router  } = require('express');
const router = Router();
const CtrlTransaccion = require("../controllers/webpay.controller");

router.post("/create", CtrlTransaccion.crearRespuesta);
<<<<<<< HEAD
router.post("/confirmar", CtrlTransaccion.confirmar)
=======
router.post("/res", CtrlTransaccion.verEstado);
router.get("/res", CtrlTransaccion.verEstado);
>>>>>>> 9bd507342cbc007da69940ced17d4e2da9b565e9

module.exports = router;