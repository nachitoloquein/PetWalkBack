const { Router } = require('express');
const router = Router();
const matchCtrl = require('../controllers/match.controller');

router.get('/', matchCtrl.obtenerTodos);
router.get('/consumidor/:id', matchCtrl.verMatchesConsumidor);
router.get('/trabajador/:id', matchCtrl.verMatchesTrabajador);
router.post('/', matchCtrl.generarMatch);

module.exports = router;