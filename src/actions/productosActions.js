import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITOSA,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_ERROR,
  PRODUCTO_EDITADO_EXITO
} from './../types/index';

import clienteAxios from '../config/axios';

/*
1. the action is invoked from the component
2. inside the action, the dispacher will call the other funcions depending on if the server response is/not ok
*/
export function crearNuevoProductoAction(producto) {
  return dispatch => {
    dispatch(nuevoProducto());

    //updating the "database"
    clienteAxios
      .post('/libros', producto)
      .then(respuesta => {
        console.log('respuesta ', respuesta);
        //in case of success, saves the producto in the redux state
        dispatch(agregarProductoExito(producto));
      })
      .catch(error => {
        console.log('error ', error);
        dispatch(agregarProductoError());
      });
  };
}

export const nuevoProducto = () => ({
  type: AGREGAR_PRODUCTO
});

//adding the producto to the state
//this operation is being mapped with an action in the redux state
export const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

export const agregarProductoError = () => ({
  type: AGREGAR_PRODUCTO_ERROR
});

//Start to making the request to the jsonAPI
export function obtenerProductosAction() {
  return dispatch => {
    dispatch(obtenerProductosComienzo());
    clienteAxios
      .get('/libros')
      .then(respuesta => {
        console.log(respuesta);
        dispatch(descargaProductosExitosa(respuesta.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(descargaProductosError());
      });
  };
}

export const obtenerProductosComienzo = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS
});

export const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITOSA,
  payload: productos
});

export const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR
});

export function borrarProductoAction(id) {
  return dispatch => {
    dispatch(obtenerProductoEliminar());
    //removes the item from the api
    clienteAxios
      .delete(`/libros/${id}`)
      .then(respuesta => {
        //removes the item from the state
        dispatch(eliminarProductoExito(id));
      })
      .catch(error => {
        console.log(error);
        dispatch(eliminarProductoError());
      });
  };
}

export const obtenerProductoEliminar = () => ({
  type: OBTENER_PRODUCTO_ELIMINAR
});

export const eliminarProductoExito = id => ({
  type: PRODUCTO_ELIMINADO_EXITO,
  payload: id
});

export const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR
});

export function obtenerProductoEditarAction(id) {
  return dispatch => {
    dispatch(obtenerProductoEditar);
    //get the right product from the API
    clienteAxios
      .get(`/libros/${id}`)
      .then(producto => {
        dispatch(obtenerProductoEditarExito(producto.data));
      })
      .catch(error => {
        dispatch(obtenerProductoEditarError());
      });
  };
}

export const obtenerProductoEditar = () => ({
  type: OBTENER_PRODUCTO_EDITAR
});

export const obtenerProductoEditarExito = producto => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto
});

export const obtenerProductoEditarError = producto => ({
  type: PRODUCTO_EDITAR_ERROR,
  payload: producto
});

export function editarProductoAction(producto) {
  return dispatch => {
    dispatch(comenzarEdicionProducto());
    clienteAxios
      .put(`/libros/${producto.id}`, producto)
      .then(respuesta => {
          dispatch(editarProductoExito(respuesta.data));
      })
      .catch(error => {
          dispatch(editarProductoError());   
      });
  };
}

export const comenzarEdicionProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
});

export const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
});

export const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR
});
