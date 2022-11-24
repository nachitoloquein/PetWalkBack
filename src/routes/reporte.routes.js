const { Router } = require('express');
const reporteCtrl = require('../controllers/reporte.controller');
const router = Router();

router.get('/', reporteCtrl.mostrarReporte);
router.post('/trabajador', reporteCtrl.reportarTrabajador);
router.post('/consumidor', reporteCtrl.reportarUsuario);
router.get('/reporteActivo', reporteCtrl.reporteActivo);
router.patch('/reporteDesactivar/:id', reporteCtrl.reporteDesactivar);

module.exports = router;