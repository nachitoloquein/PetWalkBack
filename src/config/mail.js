const nodemailer =require('nodemailer');
const html1 = require('../Template/Nuevo_mensaje.html');

const createTrans = () => {
  const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'petwalk.petsolutions@gmail.com', // generated ethereal user
        pass: 'kyaglaexnpbbguvl', // generated ethereal password
      },

  });
  return transport;
}


const sendEmail = async (user) =>{
  const transporter = createTrans()
  const info  = await transporter.sendMail({
    from: '"Su cuenta a sido activada" <petwalk.petsolutions@gmail.com>', 
    to: `${user.correo}`, 
    subject: `Hola ${user.nombre} tu cuenta de PetWalk fue ${user.activo ? "Activada": "Denegada"}`, 
    html: html1, 
  });
  console.log('mensaje email: %s', info.messageId)

  return 
}



exports.sendEmail = (user)  => sendEmail(user)
