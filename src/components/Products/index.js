import "./styles.css";
import LogoStore from "../../assets/store-selected.svg"
import User from "../../assets/user.svg"
import Close from "../../assets/close.svg"
import Card from "../Card"
import { Link, useNavigate } from "react-router-dom";
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import { useEffect } from "react";

function Products() {
    const navigate = useNavigate();
    const { token, addProducts, setAddProducts } = useGlobalContext();

    const { clearToken, clearUser, clearProducts, clearCurrentProduct, setCurrentProfile } = useGlobalContext();

    function handleLogout() {
        clearToken();
        clearUser();
        // clearProducts()
        clearCurrentProduct()
        
        navigate('/');
    }

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await api.get('/produtos', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status > 204) {
                    return
                }

                setAddProducts([...response.data]);

            } catch (error) {
                console.log(error);
            }
        }

        loadProducts();
    }, []);


    return (
        <>
            <div className="navbar-container">
                <nav className="navbar">
                    <div className="icon-bars">
                        <Link to='/main'>
                            <img src={LogoStore} alt="store icon"></img>
                        </Link>
                        <Link to='/perfil'>
                            <img src={User} alt="user icon"></img>
                        </Link>
                        <img className="sign-out" src={Close} alt="close icon" onClick={handleLogout}></img>
                    </div>
                </nav>
                <div className="store-info">
                    <h4>Nome da loja</h4>
                    <h5>Seus produtos</h5>
                </div>
                {addProducts.length !== 0 &&
                    <main className="main-content">
                        {addProducts
                            .slice()
                            .sort((a, b) => a.id - b.id)
                            .map((addProduct) => (
                                <Card
                                    allProducts={addProducts}
                                    data={addProduct}
                                    key={addProduct.id}
                                ></Card>
                            ))}

                    </main>}

                <Link to="/add-products">
                    <button className="custom-button">Adicionar produto</button>
                </Link>

            </div>
        </>
    )
}

export default Products;