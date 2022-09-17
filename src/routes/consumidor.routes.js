const { Router } = require('express');
const router = Router();

const consumidorCtrl = require('../controllers/consumidor.controller');

//router.get('/', trabajadorCtrl.listarSolicitud);
router.post('/', consumidorCtrl.Registro);

module.exports = router;