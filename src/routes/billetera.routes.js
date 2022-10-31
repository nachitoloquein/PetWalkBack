const { Router } = require('express');
const billeteraCtrl = require('../controllers/billetera.controller');
const router = Router();

router.get('/:id', billeteraCtrl.mostrarDatos);
router.put('/CargarCoinsIdBilletera/:id', billeteraCtrl.cargarCoinsIdBill)
router.put('/CargarCoinsIdConsumidor/:id', billeteraCtrl.cargarCoinsIdUsuario)


module.exports = router;