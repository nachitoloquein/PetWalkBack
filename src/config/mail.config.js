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

  const sendEmail= async (user, body) =>{
    await transporter.sendMail({
      from: '"Información de PetWalk" <petwalk.petsolutions@gmail.com>', 
      to: `${user.correo}`, 
      subject: `Hola ${user.nombre}`, 
      html: `${body}`
    });
  } 

  module.exports = {sendEmail}
