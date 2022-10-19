const { Router } = require('express');
const planCtrl = require('../controllers/plan.controller');
const router = Router();

router.get('/', planCtrl.listarPlanes);
router.post('/', planCtrl.crearPlan);
router.put('/:id', planCtrl.modificarPlan);
router.delete('/:id', planCtrl.eliminarPlan);

module.exports = router;