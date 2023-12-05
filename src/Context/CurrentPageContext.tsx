import { ReactNode, createContext, useState } from "react"

//1) intial state
const intialState = {
    currentPage: "",
    changeCurrentPage: (item:string) => { }
}

//2) create the context "STORE"
const CurrentPageContext = createContext(intialState)

//3)create a wrapper component
export const CurrentPageContextWrapper  = ({ children }: { children: ReactNode }) => {

    const [currentPage, setCurrentPage] = useState(window.location.pathname)//setting default if the client moves to another page manually (by changing the http url)

    const changeCurrentPage = (item:string) => {
        setCurrentPage(item);

    }

    return (

        <CurrentPageContext.Provider value={{ currentPage, changeCurrentPage }}>
            {children}
        </CurrentPageContext.Provider>
    )
}

export default CurrentPageContext;