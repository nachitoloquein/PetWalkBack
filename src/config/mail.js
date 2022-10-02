const nodemailer =require('nodemailer');

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

const sendEmail = async () =>{
  const transporter = createTrans()
  const activo = true
  const info  = await transporter.sendMail({
    from: '"Su cuenta a sido activada" <petwalk.petsolutions@gmail.com>', 
    to: `luisrojasborquez@gmail.com`, 
    subject: `Hola  tu cuenta de PetWalk fue ${activo ? "Activada": "Denegada"}`, 
    html: `
    <img src= "/logo">
    `, 
  });
  console.log('mensaje email: %s', info.messageId)

  return 
}



exports.sendEmail = ()  => sendEmail()