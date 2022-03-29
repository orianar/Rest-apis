const express = require('express');
const router = express.Router();
const clienteController=require('../controllers/clienteController');
const productoController= require ('../controllers/productoController');
const pedidosController= require ('../controllers/pedidosController');

module.exports= function (){
    // Agregar nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostarClientes);

    //Mostrar un cliente especifico (ID)
    router.get('/clientes/:idCliente', clienteController.mostarCliente);

    // Actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    /** PRODUCTOS*/

    // Nuevos productos

    router.post('/productos',
        productoController.subirArchivo,
        productoController.nuevoProducto);

    // Muestra todos los productos
    router.get('/productos', productoController.mostarProductos);

    // Muestra un Producto por su ID
    router.get('/productos/:IdProducto', productoController.mostarProducto);

    // Actuañizar un producto
    router.put('/productos/:IdProducto',
        productoController.subirArchivo,
        productoController.actualizarProducto);

    // Eliminar un producto
    router.delete('/productos/:IdProducto', productoController.eliminarProducto);

    //*** Pedidos */

    // Agrega nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido);

    // Mostar todos los Pedidos con relaciones de Productos y Usuarios
    router.get('/pedidos', pedidosController.mostarPedidos);

    // Mostar un pedido por su ID
    router.get('/pedidos/:IdPedidos', pedidosController.mostarPedido);

    //Actualizar pedido por su ID
    router.put('/pedidos/:IdPedidos', pedidosController.actualizarPedido);

    // Eliminar un pedido
    router.delete('/pedidos/:IdPedidos', pedidosController.eliminarPedido);








    return router;

}