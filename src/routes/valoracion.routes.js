const { Router } = require('express');
const valoracionCtrl = require('../controllers/valoracion.controller');
const router = Router();

router.get('/:id', valoracionCtrl.mostrarValoracionTrabajador);
router.post('/', valoracionCtrl.calificarTrabajador);

module.exports = router;