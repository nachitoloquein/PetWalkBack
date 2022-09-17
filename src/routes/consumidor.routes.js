const { Router } = require('express');
const router = Router();

const consumidorCtrl = require('../controllers/consumidor.controller');

router.get('/', consumidorCtrl.listarConsumidores);
router.post('/', consumidorCtrl.Registro);
router.get('/:id', consumidorCtrl.buscarConsumidor);

module.exports = router;