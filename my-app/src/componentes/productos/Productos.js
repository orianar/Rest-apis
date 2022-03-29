import React, {Fragment, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import clienteAxios from "../../config/axios";
import Producto from './Producto';
import Spinner from "../layout/Spinner";



function Productos(){
    function removerProducto (idProducto) {
        guardarProductos(productos.filter(producto => producto._id !== idProducto))
    }
    // productos= state, guardaProductos= funcion para guardar el state
    const [productos, guardarProductos ]= useState([]);

    // useEffect para consultar api cuando cargue
    useEffect(()=>{
        // Query a la API
        const consultarAPI = async ()=>{
            const productosConsulta= await clienteAxios.get('/productos');
            //console.log(productosConsulta);
            guardarProductos(productosConsulta.data);
        }
        // llamando a la api
        consultarAPI();
    },[]);


    // spinner de carga
    //if (productos.length) return <Spinner/>
    return(
        <Fragment>
            <h2>Productos</h2>
            <Link to = {'/productos/nuevo'} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle">

                </i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(producto=> (
                    <Producto
                        key={producto._id}
                        producto={producto}
                        removerProducto={removerProducto}
                    />

                ))}

            </ul>



        </Fragment>

    )
}
export default Productos;