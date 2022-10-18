const consumidorCtrl= {};
const {crearBilletera} = require('./billetera.controller');
const Consumidor = require('../models/consumidor.model');
const Trabajador = require('../models/trabajador.model')
const bcrypt = require('bcrypt');
const funciones = require('../helpers/functions.helpers');
const jwt = require('jsonwebtoken');
const transporter = require('../config/mail.config');

consumidorCtrl.listarConsumidores = async(req,res)=>{
    const consumidores = await Consumidor.find();
    res.json(consumidores);
}

consumidorCtrl.Registro = async(req, res)=>{
    try{
        const {nombre, apellido, comuna, telefono, correo, contrasena, direccion, fechaNacimiento } = req.body;
        //validamos que rellene todo
        if (!(nombre && apellido && comuna && telefono && correo && contrasena && direccion && fechaNacimiento)) {
            return res.status(400).send("Debe rellenar todos los campos");
          }
        //verificamos si existe dentro de la bdd
        const usuarioExistente = await Consumidor.findOne({correo});
        if(usuarioExistente){
           return res.status(409).send({message: 'correo electrónico existente'});
        }
        //encriptamos la contraseña
        encryptedPassword = await bcrypt.hash(contrasena, 10);
        const newConsumidor = {nombre: funciones.capitalizar(nombre), apellido: funciones.capitalizar(apellido), comuna, telefono, correo, contrasena: encryptedPassword, direccion, fechaNacimiento};
        if (newConsumidor){
            const newSolicitud = new Consumidor(newConsumidor);
            await newSolicitud.save();
            transporter.sendEmail(newSolicitud, '"Información de PetWalk" <petwalk.petsolutions@gmail.com>', `Estimado ${newSolicitud.nombre} ${newSolicitud.apellido} ha completado exitosamente su registro, ahora usted puede usar su cuenta de Pet Walk y buscar trabajadores`);
            crearBilletera(newSolicitud._id);
            res.send({message: 'Solicitud creada', newSolicitud});
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

consumidorCtrl.buscarTrabajadorCercano = async(req, res)=>{
    try{
        const consumidor = await Consumidor.findById(req.params.id);
        const trabajadores = await Trabajador.find({comuna: consumidor.comuna})
        res.send(trabajadores);
    }
    catch{
        res.status(404);
    }
}

consumidorCtrl.login= async(req, res)=>{
    try{
        const {contrasena, correo } = req.body;
        
        if(!(contrasena || correo)){
            return res.status(400).send("Debe llenar todos los campos");
        }
        const user = await Consumidor.findOne({correo});

        if(!user) return res.status(401).send('Error, correo electrónico no existente');

        if(user.activo == false){
            return res.status(403).send('Usuario Baneado');
        }

        if(user &&(await bcrypt.compare(contrasena, user.contrasena))){
            const token = jwt.sign({_id: user},process.env.TOKEN_KEY || 'test');
            console.log(token);   
            res.send({message: 'estas logeado'})
        }
    }
    catch(err){
        res.send({message: 'Algo hiciste mal ' + err});
        console.log(err);
    }
}

consumidorCtrl.banear = async(req,res)=>{
    try{
        await Consumidor.findByIdAndUpdate(req.params.id,{ $set: {activo: false } });
        const user = await Consumidor.findById(req.params.id);
        transporter.sendEmail(user, `Estimado ${user.nombre} ${user.apellido} usted a sido baneado de la plataforma PetWalk por infringir las normas comunitarias, ya no tendrá acceso a la plataforma. Si cree que hubo alguna equivocación contáctese con nosotros.`);
        res.json({status: 'Consumidor baneado'})
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

consumidorCtrl.activar = async(req,res)=>{
    try{
        await Consumidor.findByIdAndUpdate(req.params.id,{ $set: {activo: true } });
        const user = await Consumidor.findById(req.params.id);
        transporter.sendEmail(user, `Estimado ${user.nombre} ${user.apellido} Su cuenta vuelve a estar nuevamente activa en nuestra plataforma, ya tiene acceso a su cuenta.`);
        res.json({status: 'Consumidor activado'})
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

module.exports= consumidorCtrl;
