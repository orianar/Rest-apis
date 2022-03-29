import React, {Fragment, useEffect, useState} from "react";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";


function EditarCliente() {

    // Obtener el ID
    const { id }= useParams();
    console.log(id);

    let navigate = useNavigate();
    const [successRequest, setSuccessRequest] = useState(0)

    // cliente = state, datosCliente = funcion para guardar el state
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''

    });

    // Query a la API
    const consultarAPI= async ()=>{
        const clienteConsulta= await clienteAxios.get(`/clientes/${id}`);
        //console.log(clienteConsulta.data);
        // colocar en el state
        datosCliente(clienteConsulta.data);

    }


    //useEffect cuando el componente carga
    useEffect( () => {
        consultarAPI();

    }, []);

    // Leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el usuario escribe en el state
        datosCliente({
            // Obtener una copia del state actual
            ...cliente,
            [e.target.name]: e.target.value

        })
        //console.log( [e.target.name] +":" + e.target.value);
        console.log(cliente);
    }


    // Envia una peticion por axios para actualizar el cliente
    const actualizarCliente = e => {
        e.preventDefault();

        // Enviar peticion por axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res =>{
                //console.log(res);
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
                        'Correcto',
                        'Se actualizo Correctamente',
                        'success'
                    )
                    setSuccessRequest(1)

                }
            })
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
            <h2>Editar  Cliente</h2>

            <form
                onSubmit={actualizarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                           placeholder="Nombre Cliente"
                           name="nombre"
                           onChange={actualizarState}
                           value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                           placeholder="Apellido Cliente"
                           name="apellido"
                           onChange={actualizarState}
                           value={cliente.apellido}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                           placeholder="Empresa Cliente"
                           name="empresa"
                           onChange={actualizarState}
                           value= {cliente.empresa}

                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                           placeholder="Email Cliente"
                           name="email"
                           onChange={actualizarState}
                           value= {cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                           placeholder="Teléfono Cliente"
                           name="telefono"
                           onChange={actualizarState}
                           value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                           className="btn btn-azul"
                           value="Guardar cambios"
                           disabled={validarCliente()}
                    />
                </div>

            </form>
        </Fragment>

    )

}

export default EditarCliente;