import React, {Fragment, useEffect, useState} from "react";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';

import {useNavigate} from "react-router-dom";


function NuevoCliente() {

    let navigate = useNavigate();
    const [successRequest, setSuccessRequest] = useState(0)

    // cliente = state, guardarCliente = funcion para guardar el state
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''

    });

    // Leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarCliente({
            // Obtener una copia del state actual
            ...cliente,
            [e.target.name]: e.target.value


        })
        //console.log( [e.target.name] +":" + e.target.value);
        console.log(cliente);
    }

    // Añade en la Rest API un nuevo cliente
    const agregarCliente = async e => {
        e.preventDefault();

        // Enviar peticion
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                //console.log(res)
                // Validar si hay errores de Mongo
                if (res.data.code === 11000) {
                    //console.log('Error de duplicado de Mongo')
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Ese cliennte ya esta registrado'
                    })
                } else {
                    console.log(res.data);
                    Swal.fire(
                        'Se agrego cliente',
                        res.data.mensaje,
                        'success'
                    )
                    setSuccessRequest(1)

                }
            });

    }

    useEffect(() => {
        if (successRequest === 1)
            return navigate('/')
    })

    // Validar el formulario
    const validarCliente = () => {
        // Destructuring
        const {nombre, apellido, email, empresa, telefono} = cliente;
        // revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        // return true o false
        return valido;


    }
    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>

            <form
                onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                           placeholder="Nombre Cliente"
                           name="nombre"
                           onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                           placeholder="Apellido Cliente"
                           name="apellido"
                           onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                           placeholder="Empresa Cliente"
                           name="empresa"
                           onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                           placeholder="Email Cliente"
                           name="email"
                           onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                           placeholder="Teléfono Cliente"
                           name="telefono"
                           onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                           className="btn btn-azul"
                           value="Agregar Cliente"
                           disabled={validarCliente()}
                    />
                </div>

            </form>
        </Fragment>

    )

}

export default NuevoCliente;