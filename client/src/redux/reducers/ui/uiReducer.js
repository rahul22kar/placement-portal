import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    collapsed: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SIDER_COLLAPSE: return {
            ...state,
            collapsed: !state.collapsed
        };
        default: return state
    }
}
