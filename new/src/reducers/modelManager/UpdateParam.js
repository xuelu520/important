const UpdateParam = (state, action) => {
    if (typeof state == 'undefined') {
        return {
            createFirm: '',
            createBrand: '',
            editFirm: '',
            editBrand: '',
            editId: ''
        };
    }
    switch (action.type) {
        case 'MODELMANAGER_CREATE_FIRM':
            return Object.assign({}, state, {
                createFirm: action.payload
            });
        case 'MODELMANAGER_CREATE_BRAND':
            return Object.assign({}, state, {
                createBrand: action.payload
            });
        case 'MODELMANAGER_EDIT_FIRM':
            return Object.assign({}, state, {
                editFirm: action.payload
            });
        case 'MODELMANAGER_EDIT_BRAND':
            return Object.assign({}, state, {
                editBrand: action.payload
            });
        case 'MODELMANAGER_EDIT_ID':
            return Object.assign({}, state, {
                editId: action.payload
            });
        default:
            return state;
    }
};

export {
    UpdateParam
};