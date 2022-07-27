import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../../utils/firebase/firebase.utils";


/*
1.the main goal of Context hook is to create a data storage,
we that we can acess the data anywhere in the application.
2. accessing the data means , accessing the values of the context,
that could the state and also the setter function.
3.whenever the context is hooked means listend or used in any component
that component will re render when that context is updated.
*/

//this is the actural value you want to access, now it is the default value,
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

/*
1. this is the actual component, and every context has its provider
if we want to access the values of this context in any component,
 we have wrap that component with this provider 
 2. we can access
*/
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = { currentUser, setCurrentUser }


    useEffect(() => {

//what we want to happen when there is a change in auth state, 
// whenever the auth state change, we will get updated user.        
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
         return unsubscribe;
    }, [])


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}