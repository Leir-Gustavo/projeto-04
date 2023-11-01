import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

function SignUp() {
    const [name, setName] = useState('')
    const [store, setStore] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            if ((name.length !== 0 || store.length !== 0 || email.length !== 0 || password.length !== 0 || checkPassword.length !== 0) && password !== checkPassword) {
                return
            }

            const response = await api.post('/usuarios', {
                nome: name,
                nome_loja: store,
                email: email,
                senha: password,

            })

            if (response.status > 204) {
                return
            }

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='container-sign-up'>
            <form className='form-sign-up' onSubmit={handleSubmit}>
                <h1>Criar uma conta</h1>
                <div className='form-body'>
                    <input
                        type='text'
                        placeholder='Seu nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <input
                        type='text'
                        placeholder='Nome da Loja'
                        value={store}
                        onChange={(e) => setStore(e.target.value)}

                    ></input>

                    <input
                        type='email'
                        placeholder='E-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></input>
                    <input
                        type='password'
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>

                    <input
                        type="password"
                        placeholder='Repita a senha'
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <button type="submit">CRIAR CONTA</button>
                </div>
                <span>Já possui uma conta?
                    <Link to="/sign-in"> ACESSE</Link>
                </span>
            </form>
        </div>
    )
}

export default SignUp;