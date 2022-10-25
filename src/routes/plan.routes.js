const { Router } = require('express');
const planCtrl = require('../controllers/plan.controller');
const router = Router();

router.get('/', planCtrl.listarPlanes);
router.post('/', planCtrl.crearPlan);
router.put('/:id', planCtrl.modificarPlan);
router.put('/crearDescuento/:id', planCtrl.CrearDescuento);
router.patch('/descuento/:id', planCtrl.DarDeBajaManualDescuento);
router.delete('/:id', planCtrl.eliminarPlan);
router.patch('/:id', planCtrl.desactivarPlan);

module.exports = router;