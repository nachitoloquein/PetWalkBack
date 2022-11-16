const { Router } = require('express');
const router = Router();
const horarioCtrl = require('../controllers/horario.controller');

router.post('/', horarioCtrl.crearHoras);
router.delete('/:id', horarioCtrl.eliminarHora);
router.get('/:id', horarioCtrl.listarHorasDeUnTrabajadorDisponible);

module.exports = router;