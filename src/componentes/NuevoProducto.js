import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearNuevoProductoAction } from "../actions/productosActions";
import { validarFormularioAction, validacionError, validacionExito } from "../actions/validacionActions";

const NuevoProducto = ({history}) => {
  
  const [nombre, guardarNombre] = useState('');
  const [precio, guardarPrecio] = useState('');

  const dispatch = useDispatch();
  //this is like declaring an alias for the action, so it can be invoked anywhere in the component
  const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));
  const validarFormulario = () => dispatch(validarFormularioAction());
  const errorValidacion = () => dispatch(validacionError());
  const exitoValidacion = () => dispatch(validacionExito());

  const error = useSelector((state) => state.validacion.error);

  const submitNuevoProducto = e => {
    e.preventDefault();

    validarFormulario();

    if (nombre.trim() === '' || precio.trim() === '') {
      console.log('error en la validación');
      errorValidacion();
      return;
    }
    exitoValidacion();
    agregarProducto({
      nombre, precio
    });
    history.push('/');
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold ">
              Agregar Nuevo Libro
            </h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Libro"
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio Libro"
                  value={precio}
                  onChange={e => guardarPrecio(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            { error ? <div className="font-weight-bold alert alert-danger text-center">Todos los campos son oblogatorios</div> : null }
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
