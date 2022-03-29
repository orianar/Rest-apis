import React from 'react';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import clienteAxios from "../../config/axios";


function Cliente({cliente,removerCliente}) {
    //console.log(cliente.nombre);
    const {_id, nombre, apellido, empresa, email, telefono}= cliente;
    // Eliminar Cliente
    const eliminarCliente = idCliente =>{
        //console.log('eliminando....', id);
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un cliente eliminado no se puede recuperar !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Llamado a axios
                clienteAxios.delete(`/clientes/${idCliente}`)
                    .then(res => {
                        removerCliente(idCliente)
                        Swal.fire(
                            'Eliminando',
                            res.data.message,

                        )
                    })


            }
        })

    }

    return(
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>{telefono}</p>
            </div>
            <div className="acciones">
                <Link to = {`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>

                <button
                    type="button"
                    className="btn btn-rojo "
                    onClick={ () => eliminarCliente(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )

}
export default Cliente;