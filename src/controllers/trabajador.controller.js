const trabajadorCtrl = {}

const Trabajador = require('../models/trabajador.model');
const funciones = require('../helpers/functions.helpers');
const bcrypt = require('bcrypt');
const transporter = require('../config/mail.config');
const jwt = require('jsonwebtoken')



trabajadorCtrl.listarSolicitud = async(req,res)=>{
    const solicitudes = await Trabajador.find({estado: 'Pendiente'});
    res.json(solicitudes);
}

trabajadorCtrl.enviarSolicitud = async(req, res)=>{
try{
    let paths = req.files.map(file => file.path)
    const {nombre, apellido, comuna, genero, telefono, correo, contrasena, rut, direccion, fechaNacimiento } = req.body;
     //verificamos si existe dentro de la bdd
    const usuarioExistente = await Trabajador.findOne({correo});
    if(usuarioExistente){
        return res.status(409).send({message: 'correo electrónico existente'});
     }
    encryptedPassword = await bcrypt.hash(contrasena, 10);
    const newTrabajador = {nombre: funciones.capitalizar(nombre), apellido: funciones.capitalizar(apellido), comuna, genero, telefono, correo, contrasena: encryptedPassword, rut, direccion, fechaNacimiento, documentos: paths};
    if (newTrabajador && newTrabajador.documentos.length == 3){
        const newSolicitud = new Trabajador(newTrabajador);
        await newSolicitud.save();
        transporter.sendEmail(newSolicitud, `Estimado ${newSolicitud.nombre} ${newSolicitud.apellido} Su solicitud fue realizada correctamente, nuestro equipo de administración dispone de 2 días hábiles para darle respuesta.`);
        res.send({message: 'Solicitud creada', newSolicitud});
    }
    else{
        return res.send({message: 'Faltan datos'});
    }
}
catch(err){
    res.send({message: 'Algo hiciste mal ' + err});
    console.log(err);
    }
}

trabajadorCtrl.aceptar = async(req, res)=>{
    try{
        await Trabajador.findByIdAndUpdate(req.params.id,{ $set: {estado:'Activo'} });
        const user = await Trabajador.findById(req.params.id);
        transporter.sendEmail(user, `Estimado ${user.nombre} ${user.apellido} su solicitud a sido aprobada por nuestros administradores, ya puede trabajar en nuestra plataforma.`);
        res.json({status: 'Trabajador habilitado'})

    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

trabajadorCtrl.rechazar = async(req, res)=>{
    try{
        await Trabajador.findByIdAndUpdate(req.params.id,{ $set: {estado: 'Rechazado' } });
        const user = await Trabajador.findById(req.params.id);
        transporter.sendEmail(user, `Estimado ${user.nombre} ${user.apellido} su solicitud a sido rechazada por nuestro panel administrativo ya que presenta algunas incongruencias respecto la información que usted nos otorgó.`);
        res.json({status: 'Trabajador rechazado'})
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

trabajadorCtrl.listarTrabajadores = async(req,res)=>{
    const trabajadores = await Trabajador.find({estado: {$ne:'Pendiente'}});
    res.json(trabajadores);
}

trabajadorCtrl.login = async(req,res)=>{
    try{
        const {contrasena, correo } = req.body;
        
        if(!(contrasena || correo)){
            return res.status(400).send("Debe llenar todos los campos");
        }
        const user = await Trabajador.findOne({correo});

        if(!user) return res.status(401).send('Error, correo electrónico no existente');

        if(user.estado != 'Activo'){
            return res.status(403).send('Usuario sin acceso');
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

trabajadorCtrl.banear = async(req,res)=>{
    try{
        await Trabajador.findByIdAndUpdate(req.params.id,{ $set: {estado: 'Baneado' } });
        const user = await Trabajador.findById(req.params.id);
        transporter.sendEmail(user, `Estimado ${user.nombre} ${user.apellido} Hemos detectado que está infringiendo las normas de nuestra plataforma, su cuenta quedará desactivada de forma indefinida, si cree que hubo algún error contáctese con nosotros.`);
        res.json({status: 'Trabajador baneado'})
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

trabajadorCtrl.activar = async(req,res)=>{
    try{
        await Trabajador.findByIdAndUpdate(req.params.id,{ $set: {estado: 'Activo' } });
        const user = await Trabajador.findById(req.params.id);
        transporter.sendEmail(user, `Estimado ${user.nombre} ${user.apellido} su cuenta vuelve a estar activa nuevamente, ya tiene acceso a la plataforma.`);
        res.json({status: 'Trabajador activado'})
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

module.exports= trabajadorCtrl;
