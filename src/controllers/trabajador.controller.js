const trabajadorCtrl = {}

const Trabajador = require('../models/trabajador.model');
const funciones = require('../helpers/functions.helpers');
const bcrypt = require('bcrypt');

trabajadorCtrl.listarSolicitud = async(req,res)=>{
    const solicitudes = await Trabajador.find({solicitudPendiente: true});
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
    if (newTrabajador){
        const newSolicitud = new Trabajador(newTrabajador);
        await newSolicitud.save();
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
        await Trabajador.findByIdAndUpdate(req.params.id,{ $set: {activo: true , solicitudPendiente: false } });
        
        res.json({status: 'Trabajador habilitado'})
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

trabajadorCtrl.rechazar = async(req, res)=>{
    try{
        await Trabajador.findByIdAndUpdate(req.params.id,{ $set: {activo: false , solicitudPendiente: false } });
        
        res.json({status: 'Trabajador rechazado'})
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

trabajadorCtrl.listarTrabajadores = async(req,res)=>{
    const trabajadores = await Trabajador.find();
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

        if(user.activo == false || user.solicitudPendiente == true){
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
        await Trabajador.findByIdAndUpdate(req.params.id,{ $set: {activo: false } });
        res.json({status: 'Trabajador baneado'})
    }
    catch(err){
        res.send({message:  'ha ocurrido un error de '+ err});
    }
}

module.exports= trabajadorCtrl;
