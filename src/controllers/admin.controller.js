const adminCtrl = {}

const Admin = require('../models/admin.model');
const funciones = require('../helpers/functions.helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

adminCtrl.add= async(req,res)=>{
    try{
        const {nombre, apellido, comuna, telefono, correo, contrasena} = req.body;
        //validamos que rellene todo
        if (!(nombre && apellido && comuna && telefono && correo && contrasena)) {
            return res.status(400).send("Debe rellenar todos los campos");
          }
        //verificamos si existe dentro de la bdd
        const usuarioExistente = await Admin.findOne({correo});
        if(usuarioExistente){
           return res.status(409).send({message: 'correo electrónico existente'});
        }
        //encriptamos la contraseña
        encryptedPassword = await bcrypt.hash(contrasena, 10);
        const newConsumidor = {nombre: funciones.capitalizar(nombre), apellido: funciones.capitalizar(apellido), comuna, telefono, correo, contrasena: encryptedPassword};
        if (newConsumidor){
            const newUser = new Admin(newConsumidor);
            await newUser.save();
            res.send({message: 'Solicitud creada', newUser});
        }
        else{
            res.send({message: 'Faltan datos'});
            console.log('no pasó el if');
        }
    }
    catch(err){
        res.send({message: 'Algo hiciste mal ' + err});
        console.log(err);
    }
}


adminCtrl.login= async(req, res)=>{
    try{
        const {contrasena, correo } = req.body;
        
        if(!(contrasena || correo)){
            return res.status(400).send("Debe llenar todos los campos");
        }
        const user = await Admin.findOne({correo});

        if(!user) return res.status(401).send('Error, correo electrónico no existente');

        if(user.activo == false){
            return res.status(403).send('Admin Baneado');
        }

        if(user &&(await bcrypt.compare(contrasena, user.contrasena))){
            const token = jwt.sign({_id: user},process.env.TOKEN_KEY || 'test');
            console.log(token);   
            res.send({message: 'estas logeado'});
        }
        else{
            res.status(401).send('Usuario inválido');
        }
    }
    catch(err){
        res.send({message: 'Algo hiciste mal ' + err});
        console.log(err);
    }
}


module.exports= adminCtrl;
