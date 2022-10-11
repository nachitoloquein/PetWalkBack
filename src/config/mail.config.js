const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
    user: 'petwalk.petsolutions@gmail.com', // generated ethereal user
    pass: 'kyaglaexnpbbguvl', // generated ethereal password
    },
});

  transporter.verify().then(()=> {
    console.log('Ready 4 send emails');
  });

const sendEmailWork = async (user) =>{
  await transporter.sendMail({
    from: '"Información de PetWalk" <petwalk.petsolutions@gmail.com>', 
    to: `${user.correo}`, 
    subject: `Hola ${user.nombre} tu cuenta de PetWalk fue ${user.estado == 'Activo' ? "Activada": "Denegada"}`, 
    html: `<p> Mensaje generado automáticamente, favor de no responder </p>`
  });
}

const sendEmailAdmin = async (user) =>{
    await transporter.sendMail({
      from: '"Información de PetWalk" <petwalk.petsolutions@gmail.com>', 
      to: `${user.correo}`, 
      subject: `Hola ${user.nombre} tu cuenta de PetWalk fue ${user.activo ? "Activada": "Denegada"}`, 
      html: `<p> Mensaje generado automáticamente, favor de no responder </p>`
    });
  }

  const sendMessageWork = async (user) =>{
    await transporter.sendMail({
      from: '"Solicitud enviada correctamente" <petwalk.petsolutions@gmail.com>', 
      to: `${user.correo}`, 
      subject: `Hola ${user.nombre}`, 
      html: `<p> Tu solicitud para formar parte de esta organización ha sido enviada. Obtendrá respuesta en
      su correo electrónico en un plazo de 2 días hábiles </p>`
    });
  } 

  module.exports = {sendEmailAdmin, sendEmailWork, sendMessageWork}
