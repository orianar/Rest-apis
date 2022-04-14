import React,{useEffect, useState, Fragment}from "react";
import clienteAxios from '../../config/axios';
import DetallesPedidos from "./DetallesPedidos";


function Pedidos(){

    const [pedidos, guardarPedidos]= useState([]);
    useEffect(()=>{
        const consultarApi= async () =>{

            // Obtener los pedidos
            const resultado = await clienteAxios.get('/pedidos');
            console.log(resultado)
            guardarPedidos(resultado.data);
        }
        consultarApi();

    },[])
    return(
        <Fragment>
            <h2>Pedidos</h2>
            <ul className="listado-pedidos">
                {pedidos.map(pedido=>(
                    <DetallesPedidos
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))}

            </ul>

        </Fragment>


    )
}
export default Pedidos;