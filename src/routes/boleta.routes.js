const { Router } = require('express');
const router = Router();

const boletaCtrl = require('../controllers/boleta.controller');

router.get('/', boletaCtrl.verBoletas);
router.post('/', boletaCtrl.guardarBoleta);
router.get('/filtro', boletaCtrl.boletaFiltroFecha );


module.exports = router;