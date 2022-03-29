//const Clientes = require('../models/Clientes');
//const Productos= require ('../models/Productos');

const {Schema} = require('mongoose');
const mongoose = require('mongoose');
// const Schema= mongoose.Schema;
const pedidosSchema= new Schema({
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Productos',
        },
        cantidad: Number
    }],
    total:{
        type: Number
    }
});
module.exports= mongoose.model('Pedidos', pedidosSchema);