const { Router } = require('express');
const reporteCtrl = require('../controllers/reporte.controller');
const router = Router();

router.get('/', reporteCtrl.mostrarReporte);
router.post('/trabajador', reporteCtrl.reportarTrabajador);
router.post('/consumidor', reporteCtrl.reportarUsuario);

module.exports = router;