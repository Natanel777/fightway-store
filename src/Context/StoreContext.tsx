import { ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Product } from "utils/types";

interface StoreContextState {
    products: Product[];
    setProducts: (product: Product[]) => void
}

const initialState:StoreContextState =
{
    products: [],
    setProducts: () => {},
};

//create context
const StoreContext = createContext<StoreContextState>(initialState);

//wraper component rafce
export const StoreContextProvider = ({ children }: { children: ReactNode }) => {

    const [products, setProducts] = useState<Product[]>([]);

    return (
        <StoreContext.Provider value={{products,setProducts}}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContext

