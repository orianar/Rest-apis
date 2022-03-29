import React, {useState, Fragment, useEffect} from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import {useNavigate} from "react-router-dom";


function NuevoProducto(){

    // producto = state , guardarProducto= setstate
    const [producto, guardarProducto]= useState({
        nombre: '',
        precio:''
    });

    // archivo= state, guardarArchivo= setState
    const [archivo, guardarArchivo]= useState('');

    // almacena el nuevo producto en la base de datos
    const agregarProducto= async e=> {
        e.preventDefault();

        // crear un formdata
        const formData= new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        // Almacnar en la BD
        try{
            const res= await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            //lanza una alerta
            if(res.status === 200){
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
                setSuccessRequest(1)
            }

        }catch (error){
            console.log(error);
            // Lanza alerta
            Swal.fire({
                type:'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })

        }
    }
    // funcion para redireccionar
    let navigate = useNavigate();
    const [successRequest, setSuccessRequest] = useState(0)

    // redireccionar
    useEffect(() => {
        if (successRequest === 1)
            return navigate('/productos')
    })


    // leer los datos del formulario
    const leerInformacionProducto = e =>{
        guardarProducto({
            // Obtener una copia del state
            ... producto,
            [e.target.name] : e.target.value
        })

    }
    // coloca la imagen en el state
    const leerArchivo = e =>{
        console.log(e.target.files);
        guardarArchivo(e.target.files[0]);
    }

    return(
        <Fragment>
             <h2>Nuevo Producto</h2>

            <form
                onSubmit={agregarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Producto"
                        name="nombre"
                        onChange={leerInformacionProducto}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number"
                           name="precio"
                           min="0.00"
                           step="1"
                           placeholder="Precio"
                           onChange={leerInformacionProducto}
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>

                    <input
                        type="file"
                        name="imagen"
                        onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
                </div>
            </form>
        </Fragment>
    )
}
export default NuevoProducto;