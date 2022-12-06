const { Router } = require('express');
const router = Router();
const storage = require('../libs/multer.lib');

const trabajadorCtrl = require('../controllers/trabajador.controller');

router.get('/trabajadorConectado', trabajadorCtrl.verificarTrabajador);
router.get('/', trabajadorCtrl.listarSolicitud);
router.get('/perfil/:id', trabajadorCtrl.mostrarTrabajadorID);
router.get('/all', trabajadorCtrl.listarTrabajadores);
router.post('/', storage.upload.array('documentosTodos', 3), trabajadorCtrl.enviarSolicitud);
router.post('/login', trabajadorCtrl.login);
router.post('/recuperarContrasenaTrabajador', trabajadorCtrl.recuperarContrasena);
router.patch('/aceptar/:id', trabajadorCtrl.aceptar);
router.patch('/rechazar/:id', trabajadorCtrl.rechazar);
router.patch('/banear/:id', trabajadorCtrl.banear);
router.patch('/activar/:id', trabajadorCtrl.activar);
module.exports = router;