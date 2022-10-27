var express = require("express");
var router = express.Router();
var transaccion = require("../controllers/transaccion.controller");
const WebpayPlus = require("transbank-sdk").WebpayPlus;

router.use(function (req, res, next) {
  if (process.env.WPP_CC && process.env.WPP_KEY) {
    WebpayPlus.configureForProduction(process.env.WPP_CC, process.env.WPP_KEY);
  } else {
    WebpayPlus.configureForTesting();
  }
  next();
});

router.get("/create/:id", transaccion.create);
router.get("/commit", transaccion.commit);
router.post("/commit", transaccion.commit);
router.post("/status", transaccion.status);
router.post("/refund", transaccion.refund);

module.exports = router;