const { Router } = require('express');
const router = Router();

const comunasCtrl = require('../controllers/comuna.controller');

router.get('/', comunasCtrl.listarComuna);

module.exports = router;