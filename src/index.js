console.log('works');
require('./config/db.connection');
const app = require('./app');



app.listen(app.get('port'));
console.log('Server on port', app.get('port'));
console.log('Realizando acciones..')