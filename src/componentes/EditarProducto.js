import React, {Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductoEditarAction, editarProductoAction } from '../actions/productosActions';
import { validarFormularioAction, validacionError, validacionExito } from "../actions/validacionActions";
import Swal from "sweetalert2";

const EditarProducto = ({ match, history }) => {

  const nombreRef = useRef('');
  const precioRef = useRef('');

  const dispatch = useDispatch();
  const editarProducto = (producto) => dispatch(editarProductoAction(producto));
  const validarFormulario = () => dispatch(validarFormularioAction());
  const errorValidacion = () => dispatch(validacionError());
  const exitoValidacion = () => dispatch(validacionExito());

  const { id } = match.params;
  //when the component is loaded, it will call the action to get the product
  useEffect(() => {
    dispatch(obtenerProductoEditarAction(id));
  }, [dispatch, id]);

  //gets the state
  const producto = useSelector(state => state.productos.producto);
  const error = useSelector(state => state.validacion.error);

  
  if (!producto) return 'Cargando...';
  
  const submitEditarProducto = e => {
    e.preventDefault();

    validarFormulario();
    if (nombreRef.current.value.trim() === '' || precioRef.current.value.trim() === '') {
      errorValidacion();
      return; 
    }
    exitoValidacion();
    editarProducto({
      id,
      nombre: nombreRef.current.value,
      precio: precioRef.current.value
    });
    Swal.fire(
      'Almacenado',
      'El producto se actualizó correctamente',
      'success'
    );
    history.push('/');

  }
  
  return (
    <Fragment>
      {error ? (
        <div className="font-weight-bold alert alert-danger text-center">
          Hubo un error, intent nuevamente
        </div>
      ) : null }
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Editar Producto</h2>
              <form onSubmit={submitEditarProducto}>
                <div className="form-group">
                  <label>Titulo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Titulo"
                    defaultValue={producto.nombre}
                    ref={nombreRef}
                  />
                </div>
                <div className="form-group">
                  <label>Precio del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Precio"
                    defaultValue={producto.precio}
                    ref={precioRef}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                >
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditarProducto;
