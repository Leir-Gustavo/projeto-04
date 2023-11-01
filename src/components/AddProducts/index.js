import { FormControl, Input, InputAdornment, InputLabel, TextField, } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Close from "../../assets/close.svg";
import LogoStore from "../../assets/store-selected.svg";
import User from "../../assets/user.svg";
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import "./styles.css";

function AddProducts() {
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const { token, addProducts, setAddProducts } = useGlobalContext();
    const { clearToken, clearUser } = useGlobalContext();

    function handleLogout() {
        clearToken();
        clearUser();

        navigate('/');
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            const response = await api.post('/produtos',
                {
                    nome: product,
                    preco: price,
                    estoque: stock,
                    descricao: description,
                    imagem: image
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status > 204) {
                return;
            }

            setAddProducts([...addProducts, ...response.data]);

            navigate('/main')
        } catch (error) {

        }
    }


    return (
        <div className="navbar-add-container">
            <nav className="navbar">
                <div className="icon-bars">
                    <img src={LogoStore} alt="store icon" />
                    <img src={User} alt="user icon" />
                    <img src={Close} alt="close icon" onClick={handleLogout} />
                </div>
            </nav>
            <div className="store-info">
                <h4>Nome da loja</h4>
                <h5>Adicionar produto</h5>
            </div>
            <form>
                <div className="content-form">
                    <TextField
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        required
                        id="standard-required"
                        label="Nome do Produto"
                        defaultValue=""
                        variant="standard"
                    />
                    <div className="content-price-stock">
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Preço</InputLabel>
                            <Input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                id="standard-adornment-amount"
                                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Estoque</InputLabel>
                            <Input
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                id="standard-adornment-amount"
                                startAdornment={<InputAdornment position="start">Un</InputAdornment>}
                            />
                        </FormControl>
                    </div>
                    <TextField
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        id="standard-required"
                        label="Descrição do produto"
                        defaultValue=""
                        variant="standard"
                    />
                    <TextField
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        id="standard-required"
                        label="Imagem"
                        defaultValue=""
                        variant="standard"
                    />
                </div>

            </form>
            <div className="button-container">
                <Link to="/main">
                    <button className="button-1">cancelar</button>
                </Link>
                <button className="button-2" onClick={handleSubmit}>adicionar produto</button>
            </div>
        </div>
    );
}

export default AddProducts;


