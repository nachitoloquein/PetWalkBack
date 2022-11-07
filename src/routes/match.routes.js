const { Router } = require('express');
const router = Router();
const matchCtrl = require('../controllers/match.controller');
const reembolsoCtrl = require('../controllers/reembolsoCoins.controller');

router.get('/', matchCtrl.obtenerTodos);
router.get('/consumidor/:id', matchCtrl.verMatchesConsumidor);
router.get('/trabajador/:id', matchCtrl.verMatchesTrabajador);
router.post('/', matchCtrl.generarMatch);
router.put('/finalizar/:id', matchCtrl.finalizarTrabajo);
router.patch('/cancelar/:id', reembolsoCtrl.cancelarTrabajo);

module.exports = router;