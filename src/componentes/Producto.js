import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { borrarProductoAction } from '../actions/productosActions'; 
import Swal from "sweetalert2";

const Producto = ({ producto }) => {
  const dispatch = useDispatch();

  const confirmarEliminarProducto = (id) => {
    Swal .fire({
      title: 'Estas seguro?',
      text: "Un producto eliminado no se puede recuperar",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonColor: '#d33',
      cancelmButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado',
          'El producto se eliminó correctamente',
          'success'
        )
        dispatch(borrarProductoAction(id));
      }
    });
   
  }
  
  return (
    <tr>
      <td> {producto.nombre} </td>
       <td><span className="font-weight-bold">$ {producto.precio}</span></td>
      <td className="acciones">
          <Link to={`/productos/editar/${producto.id}`} className="btn btn-primary mr-2">
            Editar
        </Link>
        <button className="btn btn-danger" onClick={() => confirmarEliminarProducto(producto.id)}>
            Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
