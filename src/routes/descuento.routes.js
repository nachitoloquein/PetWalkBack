const { Router } = require('express');
const descuentoCtrl = require('../controllers/descuento.controller');
const router = Router();

router.get('/', descuentoCtrl.listarDescuentos);
router.post('/', descuentoCtrl.CrearDescuento);
router.delete('/:id', descuentoCtrl.Eliminar);
router.patch('/:id', descuentoCtrl.DarDeBajaManual);

module.exports = router;