const Usuarios= require('../models/Usuarios');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');




exports.registrarUsuario = async (req,res) => {

    // Leer los datos del usario y colocarlo en Usuarios
    const usuario= new Usuarios(req.body)
    usuario.password= await bcrypt.hash(req.body.password, 12);
    try{
        await usuario.save();
        res.json({mensaje:'Usuario Creado satifactoriamente'});

    }catch( error){
        console.log(error);
        res.json({mensaje: 'Hubo un error'})

    }

}

exports.autenticarUsuario = async (req, res, next) => {
    // Buscar el usario
    const {email, password}= req.body;
    const usuario= await Usuarios.findOne({email})
    if(!usuario){
        // Si el usuario no existe
        await res.status(401).json({mensaje:'Ese Usuario no existe '})
        next();
    }else{
        // El usuario existe, verificar si el password es correcto o incorrecto
        if(!bcrypt.compareSync(password, usuario.password)){
            // Si el password es incorrecto
            await res.status(401).json({mensaje:'Password incorrecto'});
            next();
        }else{
            // Password correcto , firmar el token
            const token= jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id,

            }, 'LlaveSecreta',
                {
                    expiresIn:'1h'
                });
            //Retornar
            res.json({token})

        }
    }

}
