import { useLocalStorage } from "react-use";
import { useState } from 'react';

function useGlobalContextProvider() {
    const [token, setToken, clearToken] = useLocalStorage('token');
    const [user, setUser, clearUser] = useLocalStorage('user');
    const [addProducts, setAddProducts, clearProducts] = useState([]);
    const [currentProduct, setCurrentProduct, clearCurrentProduct] = useLocalStorage('current_product');

    return {
        token,
        setToken,
        clearToken,
        user,
        setUser,
        clearUser,
        addProducts,
        setAddProducts,
        clearProducts,
        currentProduct,
        setCurrentProduct,
        clearCurrentProduct
    }
}

export default useGlobalContextProvider;