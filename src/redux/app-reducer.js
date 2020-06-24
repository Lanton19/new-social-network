import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'; // инициализация прошла успешно

let initialState = {                       //первоначальная инициализация
    initialized: false,                                                          
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const initializedSucces = () => ({ type: INITIALIZED_SUCCESS })

export const initializApp = () => (dispatch) => { 
    let promise = dispatch(getAuthUserData());

    Promise.all ([promise])
        .then(() => {
        dispatch(initializedSucces());
    });
}

export default appReducer;