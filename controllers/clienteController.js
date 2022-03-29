const Clientes = require('../models/Clientes');
// agrega un nuevo cliente

exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        // almacenar el registro
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'});
    } catch (error) {
        // Si hay un error, console.log y next
        res.send(error);
        next();
    }
}

// Muestra todos los clientes

exports.mostarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un cliente por su ID

exports.mostarCliente = async (req, res, next) => {
    try{
        const cliente= await Clientes.findById(req.params.idCliente);
        res.json(cliente)
    } catch (e) {
        res.json('No existe ese cliente');
    }
}
// Actualiza clientes
exports.actualizarCliente= async (req, res, next) =>{
    try {
        const cliente= await Clientes.findOneAndUpdate({_id:req.params.idCliente }, req.body,{
            new: true
        });
        res.json(cliente);
    }catch (error){
        res.send(error);
        next();

    }

}
// Eliminar cliente por su ID
exports.eliminarCliente= async (req,res, next)=>{
    try {
        await Clientes.findByIdAndDelete({_id:req.params.idCliente });
        res.json({mensaje:'El Cliente ha sido elimeinado correctamente'})
    }catch (error){
        console.log(error);
        next();

    }

}