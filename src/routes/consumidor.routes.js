const { Router } = require('express');
const router = Router();
const consumidorCtrl = require('../controllers/consumidor.controller');

router.get('/consumidorConectado', consumidorCtrl.verificarConsumidor);
router.get('/', consumidorCtrl.listarConsumidores);
router.get('/perfil/:id', consumidorCtrl.mostrarConsumidorID);
router.post('/', consumidorCtrl.Registro);
router.post('/login', consumidorCtrl.login);
router.get('/:id', consumidorCtrl.buscarTrabajadorCercano);
router.patch('/banear/:id', consumidorCtrl.banear);
router.patch('/activar/:id', consumidorCtrl.activar);

module.exports = router;