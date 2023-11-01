import "./styles.css";
import LogoStore from "../../assets/store-selected.svg";
import User from "../../assets/user.svg";
import Close from "../../assets/close.svg";
import { FormControl, InputLabel, Input, TextField, InputAdornment, } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import useGlobalContext from '../../hooks/useGlobalContext';
import { useEffect, useState } from "react";
import api from '../../services/api';

function EditProducts({data}) {

    const { currentProduct, clearToken, clearUser, token } = useGlobalContext();
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    function handleLogout() {
        clearToken();
        clearUser();

        navigate('/');
    }

    useEffect(() => {
        if (currentProduct) {


            const { nome, preco, estoque, descricao, imagem } = currentProduct;

            setProduct(nome);
            setPrice(preco);
            setStock(estoque);
            setDescription(descricao);
            setImage(imagem);
        }
    }, [currentProduct])


    async function handleSubmit(e) {
        e.preventDefault();

        try {

            if (!product || !price || !stock || !description || !image) {
                return;

            }

            const response = await api.put(`/produtos/${currentProduct.id}`,
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

            navigate('/main');


            if (response.status > 204) {
                return;
            }

            const localProducts = [...data];

            const productInEditingIndex = localProducts.findIndex((product) => product.id === currentProduct.id)

            localProducts[productInEditingIndex].nome = product;
            localProducts[productInEditingIndex].preco = price;
            localProducts[productInEditingIndex].estoque = stock;
            localProducts[productInEditingIndex].descricao = description;
            localProducts[productInEditingIndex].imagem = image;

            
            setProduct([...localProducts]);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="navbar-add-container">
            <nav className="navbar">
                <div className="icon-bars">
                    <Link to='/main'>
                        <img src={LogoStore} alt="store icon"></img>
                    </Link>
                    <Link to='/edit-perfil'>
                        <img src={User} alt="user icon"></img>
                    </Link>
                    <img src={Close} alt="close icon" onClick={handleLogout} />
                </div>
            </nav>
            <div className="store-info">
                <h4>Nome da loja</h4>
                <h5>Editar produto</h5>
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
                <button className="button-2" onClick={handleSubmit}>SALVAR ALTERAÇÕES</button>
            </div>
        </div>
    );
}

export default EditProducts;


