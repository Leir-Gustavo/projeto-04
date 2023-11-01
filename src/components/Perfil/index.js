import "./styles.css";
import LogoStore from "../../assets/store-selected.svg"
import User from "../../assets/user.svg"
import Close from "../../assets/close.svg"
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import useGlobalContext from '../../hooks/useGlobalContext';
import { useEffect, useState } from "react";

function Perfil() {

    const navigate = useNavigate();

    const { clearToken, clearUser, user, clearCurrentProduct } = useGlobalContext();
    const [name, setName] = useState('')
    const [store, setStore] = useState('')
    const [email, setEmail] = useState('')

    function handleLogout() {
        clearToken();
        clearUser();
        clearCurrentProduct();

        navigate('/');
    }

    useEffect(() => {
        if (user) {
            const { nome, nome_loja, email } = user;

            setName(nome);
            setStore(nome_loja);
            setEmail(email);
        }
    }, [user])

    return (
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
                <h5>Perfil</h5>
            </div>
            <div className="content-form">
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled
                    id="standard-required"
                    label="Seu nome"
                    defaultValue=""
                    variant="standard"
                />

                <TextField
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                    disabled
                    id="standard-required"
                    label="Nome da loja"
                    defaultValue=""
                    variant="standard"
                />
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    id="standard-required"
                    label="E-mail"
                    defaultValue=""
                    variant="standard"
                />
            </div>
            <Link to="/edit-perfil">
                <button className="custom-button">EDITAR PERFIL</button>
            </Link>

        </div>

    )
}

export default Perfil;