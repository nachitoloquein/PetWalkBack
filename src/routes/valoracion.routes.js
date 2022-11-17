const { Router } = require('express');
const valoracionCtrl = require('../controllers/valoracion.controller');
const router = Router();

router.get('/:id', valoracionCtrl.mostrarValoracionTrabajador);
/* router.post('/trabajador', reporteCtrl.reportarTrabajador);
router.post('/consumidor', reporteCtrl.reportarUsuario); */

module.exports = router;