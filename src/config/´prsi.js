const sendEmail = async (user) =>{
    const transporter = createTrans()
    const info  = await transporter.sendMail({
      from: '"Su cuenta a sido activada" <petwalk.petsolutions@gmail.com>', 
      to: `${user.correo}`, 
      subject: `Hola ${user.name} tu cuenta de PetWalk fue ${user.activo ? "Activada": "Denegada"}`, 
      html: `
      <img src= "logo.png">
      `, 
    });
    console.log('mensaje email: %s', info.messageId)
  
    return 
  }
  
  
  
  exports.sendEmail = (user)  => sendEmail(user)