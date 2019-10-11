import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productosActions'; 
import Producto from './Producto';

const Productos = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos(); 
  },[]) //IMPORTANT the empty array is for this function invoke only ONE TIME


  const loading = useSelector(state => state.productos.loading);
  const error = useSelector(state => state.productos.error);
  //getting the products from the store
  const productos = useSelector(state => state.productos.productos);

  return (
    <React.Fragment>
      {error ? <div className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</div> : null }      
      <h2 className="text-center my-5">Listado de Productos</h2>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody >
          {productos.map(producto => (
            <Producto key={producto.id} producto={producto}  />
          ))}
        </tbody>
      </table>
      { loading ? 'Cargando...' : null }    
    </React.Fragment>
  );
};

export default Productos;
