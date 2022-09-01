const { Router } = require('express');
const router = Router();

const trabajadorCtrl = require('../controllers/trabajador.controller');

router.get('/', trabajadorCtrl.listarSolicitud);
router.post('/', trabajadorCtrl.enviarSolicitud);

module.exports = router;