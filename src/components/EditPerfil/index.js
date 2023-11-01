import "./styles.css";
import LogoStore from "../../assets/store-selected.svg";
import User from "../../assets/user.svg";
import Close from "../../assets/close.svg";
import { TextField, } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';

function EditPerfil() {
    const navigate = useNavigate();

    const { user, setUser, token } = useGlobalContext();
    const [name, setName] = useState('')
    const [store, setStore] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const { clearToken, clearUser } = useGlobalContext();

    function handleLogout() {
        clearToken();
        clearUser();

        navigate('/');
    }

    useEffect(() => {
        if (user) {
            const { nome, nome_loja, email, senha, senhaConfirmacao } = user;

            setName(nome);
            setStore(nome_loja);
            setEmail(email);
            setPassword(senha);
            setCheckPassword(senhaConfirmacao);
        }
    }, [user])

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            if ((name.length !== 0 || store.length !== 0 || email.length !== 0 || password.length !== 0 || checkPassword.length !== 0) && password !== checkPassword) {
                return
            }

            const response = await api.put('/perfil',
                {
                    nome: name,
                    nome_loja: store,
                    email: email,
                    senha: password,
                    senhaConfirmacao: checkPassword
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

            clearUser();

            setUser({
                nome: name,
                nome_loja: store,
                email: email,
                senha: password,
                senhaConfirmacao: checkPassword
            });

            navigate('/main')
        } catch (error) {

        }
    }


    return (
        <div className="navbar-add-container">
            <nav className="navbar">
                <div className="icon-bars">
                    <Link to='/main'>
                        <img src={LogoStore} alt="store icon"></img>
                    </Link>
                    <img src={User} alt="user icon"></img>
                    <img src={Close} alt="close icon" onClick={handleLogout} />
                </div>
            </nav>
            <div className="store-info">
                <h4>Nome da loja</h4>
                <h5>Editar perfil</h5>
            </div>
            <form>
                <div className="content-form">
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        id="standard-required"
                        label="Seu nome"
                        defaultValue=""
                        variant="standard"
                    />

                    <TextField
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        required
                        id="standard-required"
                        label="Nome da loja"
                        defaultValue=""
                        variant="standard"
                    />
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        id="standard-required"
                        label="E-mail"
                        defaultValue=""
                        variant="standard"
                    />

                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        id="standard-required"
                        label="Nova senha"
                        defaultValue=""
                        variant="standard"
                        type="password"
                    />

                    <TextField
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                        required
                        id="standard-required"
                        label="Repita a nova senha"
                        defaultValue=""
                        variant="standard"
                        type="password"
                    />
                </div>

            </form>
            <div className="button-container">
                <Link to="/perfil">
                    <button className="button-1">cancelar</button>
                </Link>
                <button className="button-2" onClick={handleSubmit}>EDITAR PERFIL</button>
            </div>
        </div>
    );
}

export default EditPerfil;


