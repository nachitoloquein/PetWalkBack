const { Router } = require('express');
const planCtrl = require('../controllers/plan.controller');
const router = Router();

router.get('/', planCtrl.listarPlanes);
router.post('/', planCtrl.crearPlan);
router.put('/:id', planCtrl.modificarPlan);
router.put('/crearDescuento/:id', planCtrl.CrearDescuento);
router.patch('/descuento/desactivar/:id', planCtrl.DarDeBajaManualDescuento);
router.patch('/descuento/activar/:id', planCtrl.ActivarDescuento);
router.delete('/:id', planCtrl.eliminarPlan);
router.patch('/desactivar/:id', planCtrl.desactivarPlan);
router.patch('/activar/:id', planCtrl.activarPlan);

module.exports = router;