import { createContext, useEffect, useReducer } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";

import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () =>null,  
});

export const USER_ACTION_TYPES = {
   SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state, action) => {
    const {type, payload} = action;
   
    
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
        
        default:
            throw new Error(`Unhandled type ${type} in the userReducer`);
    }
}



export const UserProvider = ({children}) => {
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE );
    console.log(currentUser);

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }


    const value = {currentUser, setCurrentUser};

    signOutUser();

    useEffect(() => {
        const unsubcribe = onAuthStateChangedListener((user) => {
        if(user) {
           createUserDocumentFromAuth(user); 
        }
        setCurrentUser(user);
        })
        return unsubcribe

    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}