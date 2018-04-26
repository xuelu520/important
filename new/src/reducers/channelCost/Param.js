import moment from 'moment';

const Param = (state,action) => {
    if(typeof state == 'undefined'){
        return {
            channelGroup: '',
            channelName: '',
            startDate: moment().subtract(30, 'days').format("YYYY-MM-DD"),
            endDate: moment().subtract(1, 'days').format("YYYY-MM-DD")
        };
    }
    switch (action.type) {
        case "CHANNELCOST_CHANNELGROUP":
            return Object.assign({}, state, {
                channelGroup: action.payload
            });
        case "CHANNELCOST_CHANNELNAME":
            return Object.assign({}, state, {
                channelName: action.payload
            });
        case "CHANNELCOST_STARTDATE":
            return Object.assign({}, state, {
                startDate: action.payload
            });
        case "CHANNELCOST_ENDDATE":
            return Object.assign({}, state, {
                endDate: action.payload
            });
        default:
            return state;
    }
};

export {
    Param
}