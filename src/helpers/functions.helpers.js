
function capitalizar(dato){
    return dato.charAt(0).toUpperCase()+ dato.slice(1)
}

async function validarExistente(modelo, email){
const usuarioExistente = await modelo.findOne({email});
    if(usuarioExistente){
        return res.status(409).send('Correo electrónico existente');
    }   
}

module.exports = {
    capitalizar,
    validarExistente
};


