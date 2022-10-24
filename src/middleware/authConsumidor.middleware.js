const jwt = require('jsonwebtoken');

async function verificarConsumidor(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('No envía cabecera');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('La cabecera está vacía');
		}

		const payload = await jwt.verify(token, 'consumidor');
		if (!payload) {
			return res.status(401).send('No reconoce token');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		console.log(e)
		return res.status(401).send('Algo salio mal');
	}
}

module.exports = {verificarConsumidor}