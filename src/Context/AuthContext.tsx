import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextState {
    isLoggedIn: boolean;
    signUp: () => void
    login: (username: string, token: string) => void;
    logout: () => void;
    token?: string
    username?: string 
}

const initialState =
{
    isLoggedIn: false,
    signUp: () => { },
    login: (username: string, token: string) => { },
    logout: () => { },
    token: undefined,
    username: undefined
};

//create context
const AuthContext = createContext<AuthContextState>(initialState);

//wraper component rafce
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string>();
    const [token, setToken] = useState<string>();

   // This effect runs once after the initial render
    useEffect(() => {
      const data = localStorage.getItem("user")
    
      if(data){
        const user = JSON.parse(data);
        setIsLoggedIn(true);
        setToken(user.token)
        setUsername(user.username)

      }
    }, [])
    

    const auth = {
        isLoggedIn: isLoggedIn,
        token,
        username,
        signUp:() =>{
            setIsLoggedIn(true)
        },
        login: (username: string, token: string) => {
            setUsername(username)
            setToken(token)
            setIsLoggedIn(true)
        },

        logout: () => {
            localStorage.removeItem('user')
            setUsername(undefined)
            setToken(undefined)
            setIsLoggedIn(false)
        },

    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

