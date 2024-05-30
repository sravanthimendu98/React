import { GET_USERS_SUCCESS, DELETE_USERS, UPDATE_USER } from "./actions";

const myFirstReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return { ...state, users: action.users };
        case DELETE_USERS:
            return { 
                ...state, 
                users: state.users.filter(user => !action.payload.includes(user.id)) 
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
            };
        default:
            return state;
    }
};

export default myFirstReducer;
