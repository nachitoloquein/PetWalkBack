const mysql = require ('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'tesis'
});

conexion.connect((err)=>{
    if(err){
        console.log(`ha ocurrido un error: ${err}`);
    }else{
        console.log(`La conexión es exitosa`)
    }
});

module.exports=conexion;