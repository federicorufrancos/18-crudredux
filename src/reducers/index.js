import { combineReducers } from 'redux';
import productosReducer from './productosReducer';
import validacionReducer from './validacionReducer';

export default combineReducers({
    productos: productosReducer,
    validacion: validacionReducer
});