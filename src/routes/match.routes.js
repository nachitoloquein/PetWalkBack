const { Router } = require('express');
const router = Router();
const matchCtrl = require('../controllers/match.controller');
const reembolsoCtrl = require('../controllers/reembolsoCoins.controller');

router.get('/', matchCtrl.obtenerTodos);
router.get('/consumidor/:id', matchCtrl.verMatchesConsumidor);
router.get('/trabajador/:id', matchCtrl.verMatchesTrabajador);
router.get('/historialConsumidor/:id', matchCtrl.verHistorialConsumidor);
router.get('/historialTrabajador/:id', matchCtrl.verHistorialTrabajador);
router.post('/:id', matchCtrl.generarMatch);
router.put('/finalizar/:id', matchCtrl.finalizarTrabajo);
router.get('/cancelar/:id', reembolsoCtrl.cancelarTrabajo);

module.exports = router;