export const SelectedTrackId = (details) => {
    return {
        type: "SELECTED_SERIAL_NUMBER",
        payload: details
    };
};

export const selectedProductDetails = (details) => {
    return {
        type: "SELECTED_PRODUCT",
        payload: details
    };
};
