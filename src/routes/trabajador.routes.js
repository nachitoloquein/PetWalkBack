const { Router } = require('express');
const router = Router();
const storage = require('../libs/multer.lib')

const trabajadorCtrl = require('../controllers/trabajador.controller');

router.get('/', trabajadorCtrl.listarSolicitud);
router.post('/', storage.upload.array('documentosTodos', 3), trabajadorCtrl.enviarSolicitud);

module.exports = router;