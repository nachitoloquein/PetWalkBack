const { Router  } = require('express');
const router = Router();
const CtrlSolicitudRetiroDinero = require('../controllers/solicitudRetiroDinero.controller');

router.post("/", CtrlSolicitudRetiroDinero.realizarSolicitud);
router.get("/", CtrlSolicitudRetiroDinero.listarSolicitudes);
module.exports = router;