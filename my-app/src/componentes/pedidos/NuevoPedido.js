import React, { useEffect, Fragment, useState} from 'react';
import { useParams } from "react-router-dom";
import clientesAxios from '../../config/axios';
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";
import Swal from "sweetalert2";



function NuevoPedido() {

    // Extraer ID de cliente
    const { id }= useParams();
    console.log(id);

    // State
    const [cliente, guardarCliente]= useState({});
    const [busqueda, guardarBusqueda]= useState('');
    const [productos, guardarProductos]= useState([]);
    const [total, guardarTotal]= useState(0);


    //Obtener el cliente
    const consultarAPI = async ()=> {
        // Consultar el cliente actual
        const resultado = await clientesAxios.get(`/clientes/${id}`);
        //console.log (resultado.data)
        guardarCliente(resultado.data);
    }
    useEffect(()=> {
        // Llamar la api
        consultarAPI();
        // actualizar el total
        actualizarTotal();
    }, [productos]);

    const buscarProducto = async e=>{
        e.preventDefault();

        // Obtener los productos de la busqueda
        const resultadoBusqueda= await clientesAxios.post(`/productos/busqueda/${busqueda}`);
        console.log(resultadoBusqueda)
        // Si no hay resultados una alerta , contrario agregarlo al state
        if (resultadoBusqueda.data[0]){

            //console.log(resultadoBusqueda.data[0]);
            let productoResultado=resultadoBusqueda.data[0];
            // Agregar la llave "producto" (copia id)
            productoResultado.producto= resultadoBusqueda.data[0]._id;
            productoResultado.cantidad=0;
            //console.log(productoResultado);
            // ponerlo en el state
            guardarProductos([...productos, productoResultado]);
        }else{
            //No hay resultado
            Swal.fire({
                type:'error',
                title:'No  resultados',
                text:'No hay resultados'
            })
        }
    }

    // almacenar una busqueda en el state

    const leerDatosBusqueda = e=> {
        guardarBusqueda(e.target.value);

    }

    // actualizar cantidad de productos
    const restarProductos = i =>{
        // Copiar el arreglo original de productos
        const todosProductos= [...productos];

        // Valiodad si esta 0 no puede ir mas alla
        if (todosProductos [i].cantidad===0) return ;

        // decremento
        todosProductos[i].cantidad--;

        // almacenarlo en el state
        guardarProductos(todosProductos);

        // Actualizar el total a pagar
        //actualizarTotal();


    }
    const aumentarProductos= i=>{
        // Copiar el arreglo para no mutarlo
        const todosProductos= [...productos];

        // Incremento
        todosProductos[i].cantidad++;


        // Almacenarlo en el state
        guardarProductos(todosProductos);

        // Actualizar el total a pagar
        //actualizarTotal();
    }

    const actualizarTotal= ()=>{
        // Si el arreglo de productos es = 0 el total es 0
        if (productos.length===0){
            guardarTotal(0);
            return;
        }
        // Calcular el nuevo Total
        // Recorrer todos los productos, sus cantidades y precios
        let nuevoTotal = productos.map(producto=> producto.cantidad* producto.precio).reduce((acc, currentValue) => acc + currentValue, 0) ;
        // Almacenar el total
        guardarTotal(nuevoTotal);
    }






    return (
        <Fragment>



            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Telefono: {cliente.telefono}</p>
            </div>

            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}

            />

            <ul className="resumen">
                {productos.map ( (producto, index)=> (
                    <FormCantidadProducto
                        key={producto.producto}
                        producto={producto}
                        restarProductos={restarProductos}
                        aumentarProductos={aumentarProductos}
                        index={index}


                    />

                ))}



            </ul>

            <p className= "total">Total a pagar : <span>${total}</span>
            </p>

            {total > 0 ? (
                <form>
                    <input type="submit"
                           className=" btn btn-verde btn-block"
                           value="Realizar Pedido "/>
                </form>

            ): null}


        </Fragment>


    )
}
export default NuevoPedido;