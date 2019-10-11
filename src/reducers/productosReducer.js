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
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from "./../types/index";

const initialState = {
    productos: [],
    error: null,
    loading: false,
    producto: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case AGREGAR_PRODUCTO:
            /* adding a product just return a copy of the state */
            return {
                ...state,
                error: null
            };
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                error: null,
                productos: [
                    ...state,
                    action.payload
                ] /* after the response of success from the api, the product is added to the redux state */
            };
        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: true
            };
        case DESCARGA_PRODUCTOS_EXITOSA:
            return {
                ...state,
                productos: action.payload,
                loading: false,
                error: false,
                producto: {}
            };
        case DESCARGA_PRODUCTOS_ERROR:
            return {
                ...state,
                productos: [],
                loading: false,
                error: true,
                producto: {}    //this is cleaning up the product selected
            };
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                error: null
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                error: null,
                productos: state.productos.filter(producto => producto.id !== action.payload)
            }
        case PRODUCTO_ELIMINADO_ERROR:
            return {
                ...state,
                error: true
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                error: null
            }
        case PRODUCTO_EDITAR_EXITO:
            return {
                ...state,
                producto: action.payload //this will be the producto editing on the frontend form
            }
        case PRODUCTO_EDITAR_ERROR:
            return {
                ...state,
                error: true
            }
        case COMENZAR_EDICION_PRODUCTO:
            return {
                ...state,
                error: null
            }
        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                error: null,
                productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto)
            }
        case PRODUCTO_EDITADO_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}