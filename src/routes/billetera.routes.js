const { Router } = require('express');
const billeteraCtrl = require('../controllers/billetera.controller');
const router = Router();

router.get('/:id', billeteraCtrl.mostrarDatos);

module.exports = router;