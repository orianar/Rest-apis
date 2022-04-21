import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import clientesAxios from '../../config/axios';
import {useNavigate} from "react-router-dom";

function Login(){

    const [credenciales, guardarCredenciales]= useState({
        email:'',
        password:'',
    });

    const iniciarSesion= async e=>{
        e.preventDefault();

        // Autenticar el usuario
        try{
            const respuesta = await clientesAxios.post('/iniciar-sesion', credenciales);


            // Extraer el token y colocarlo en localstorage
            const {token}= respuesta.data;
            localStorage.setItem('token', token);

            // Alerta
            Swal.fire(
                'Login Correcto',
                'Has iniciado sesion',
                'success',
            )
            //Redireccionar
            setSuccessRequest(1)

        }catch(error){
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.message,

            })

        }

    }
    // funcion para redireccionar
    let navigate = useNavigate();
    const [successRequest, setSuccessRequest] = useState(0)

    // redireccionar
    useEffect(() => {
        if (successRequest === 1)
            return navigate('/')
    })



    const leerDatos= e=>{
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })

    }
    return(
        <div className="login">
            <h2>Iniciar Sesion</h2>
            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >
                    <div className="campo">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email para iniciar sesion"
                            required
                            onChange={leerDatos}
                        />
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password para iniciar sesion"
                            required
                            onChange={leerDatos}
                        />
                    </div>
                    <input type="submit" value="Iniciar Sesion" className="btn btn-verde btn-block"/>
                </form>
            </div>
        </div>
    )
}
export default Login;