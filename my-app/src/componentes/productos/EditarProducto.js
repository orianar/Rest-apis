import React, {useEffect, useState, Fragment} from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import {useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";


function EditarProducto(){
    //Obtener el ID del producto
    const { id }= useParams();
    console.log(id);

    // producto = state , y funcion para actualizar
    const [producto, guardarProducto]= useState({
        nombre:'',
        precio:'',
        imagen:''
    })

    // Consultar la aqpi (Queru) para traer el producto a editar

    const consultarAPI= async ()=>{
        const productoConsulta = await clienteAxios.get(`/productos/${id}`);
        console.log(productoConsulta.data);
        guardarProducto(productoConsulta.data);
    }

    // Cuando el componente carga
    useEffect(()=>{
        consultarAPI()

    }, [])


    // Edita Un producto en la base de datos
    const editarProducto= async e => {
        e.preventDefault()

        // crear un formdata
        const formData= new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        // Almacnar en la BD
        try{
            const res= await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            //lanza una alerta
            if(res.status === 200){
                Swal.fire(
                    'Editado Correctamente',
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

    // archivo= state, guardarArchivo= setState
    const [archivo, guardarArchivo]= useState('');

    // coloca la imagen en el state
    const leerArchivo = e =>{
        console.log(e.target.files);
        guardarArchivo(e.target.files[0]);
    }

    //extraer los valores del State

    const { nombre, precio, imagen}= producto;

    return(
        <Fragment>
            <h2> Editar  Producto</h2>

            <form
                onSubmit={editarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Producto"
                        name="nombre"
                        onChange={leerInformacionProducto}
                        defaultValue={nombre}

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
                           defaultValue={precio}

                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    { imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} alt= "imagen"
                             width="300" />

                    ): null}
                    <input
                        type="file"
                        name="imagen"
                        onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Editar Producto"/>
                </div>
            </form>
        </Fragment>
    )
}
export default EditarProducto;