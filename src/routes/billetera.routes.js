const { Router } = require('express');
const billeteraCtrl = require('../controllers/billetera.controller');
const router = Router();

router.get('/:id', billeteraCtrl.mostrarDatos);
<<<<<<< HEAD
router.put('/CargarCoinsIdBilletera/:id', billeteraCtrl.cargarCoinsIdBill)
router.put('/CargarCoinsIdConsumidor/:id', billeteraCtrl.cargarCoinsIdUsuario)

=======
router.put('/CargarCoinsIdConsumidor/:id', billeteraCtrl.cargarCoinsIdUsuario);
>>>>>>> 9bd507342cbc007da69940ced17d4e2da9b565e9

module.exports = router;