const Param = (state, action) => {
    if (typeof state == 'undefined') {
        return {
            appCode: '',
            deviceModel: '',
            firm: '',
            brand: ''
        };
    }
    switch (action.type) {
        case 'MODELMANAGER_APPCODE':
            return Object.assign({}, state, {
                appCode: action.payload
            });
        case 'MODELMANAGER_DEVICEMODEL':
            return Object.assign({}, state, {
                deviceModel: action.payload
            });
        case 'MODELMANAGER_FIRM':
            return Object.assign({}, state, {
                firm: action.payload
            });
        case 'MODELMANAGER_BRAND':
            return Object.assign({}, state, {
                brand: action.payload
            });
        default:
            return state;
    }
};

export {
    Param
}