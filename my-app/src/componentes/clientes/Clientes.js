import React, {useEffect, useState, Fragment, useRef} from "react";

// import clientes axios
import clienteAxios from '../../config/axios'
import Cliente  from './Cliente';
import {Link} from 'react-router-dom';
import Spinner from "../layout/Spinner";

 function Clientes(){


     //Trabajar con el state
     // clientes= state, guardarClientes= funcion para guardar el state
     const [clientes, guardarClientes]= useState([]);
     function removerCliente(idCliente) {
         let newClients = clientes.filter(cliente => cliente._id !== idCliente)
         guardarClientes(newClients)
     }

     //Query a la API
     const consultarAPI = async () => {
         const clientesConsulta= await clienteAxios.get('/clientes')
             //.then(result => guardarClientes(result.data));
         //console.log(clientesConsulta.data);
          guardarClientes(clientesConsulta.data);

     };



    // Use effect es similar a componentdidmount y willmount
     useEffect(() => {
         consultarAPI()

     },[]);

     // spinner de carga
     //if (clientes.length) return <Spinner/>
    return(
        <Fragment>
            <h2>Clientes</h2>
            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clientes.map( cliente=>
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}
                        removerCliente={removerCliente}
                    />
                )}

            </ul>
        </Fragment>
    )
}
export default Clientes;