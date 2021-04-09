import { combineReducers } from 'redux';

const intial_state = {
    _id: '',
    serial_number: '',
    manufacturer: '',
    date_of_entry: '',
    date_of_expiry: '',
    item_Type: '',
    x_cord: '',
    y_cord: ''
}

const selectedSerialNoReducer = (state = '', action) => {
    if (action.type === "SELECTED_SERIAL_NUMBER") {
        return action.payload;
    }
    return state;
}

const selectedProductReducer = (state = intial_state, action) => {
    if (action.type === "SELECTED_PRODUCT") {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    serial_no: selectedSerialNoReducer,
    product: selectedProductReducer
});