const Pedidos= require('../models/Pedidos');
const e = require("express");


exports.nuevoPedido= async (req, res, next)=>{
    const pedido= new Pedidos(req.body);
    console.log(JSON.stringify(req.body))
    try {
        // Almacenar el registro
        await pedido.save();
        res.json('Se agrego un nuevo pedido')
    }catch (error){
        res.json(error);
        next();
    }
}
// Muestra todos los pedidos
exports.mostarPedidos= async (req, res, next)=>{
    try{
        const pedidos= await Pedidos.find({}).populate('cliente').populate({path:'pedido.producto',
        model:'Productos'
        });
        res.json(pedidos)

    } catch (error){
        res.json(error);
        next();
    }
}

// Mostar pedidos por su ID
exports.mostarPedido= async (req, res, next)=>{
    try{
        const pedido= await Pedidos.findById(req.params.IdPedidos)
            .populate('cliente')
            .populate({
                path:'pedido.producto',
                model:'Productos'
            });
        res.json(pedido)
    }catch (error){
        res.json({mensaje: 'El pedido no existe'});
        next();
    }
}

//Actualizar pedido por su ID
exports.actualizarPedido= async (req,res,next)=>{
    try{
        let pedido= await Pedidos.findOneAndUpdate({_id:req.params.IdPedidos}, req.body,{
            new:true
        })
        .populate('cliente')
        .populate({
            path:'pedido.producto',
            model:'Productos'
        });
        res.json(pedido);
    } catch (error){
        res.json(error);
        next();
    }
}

// Eliminar pedido
exports.eliminarPedido= async (req, res, next)=>{
    try{
        await Pedidos.findByIdAndDelete({_id:req.params.IdPedidos});
        res.json({mensaje:'El pedido fue eliminado correctamente'});
    }catch (error){
        res.json(error);
        next();
    }
}
