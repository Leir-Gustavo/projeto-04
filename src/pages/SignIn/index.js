import { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import useGlobalContext from '../../hooks/useGlobalContext';


function SignIn() {
    const { token, setToken, setUser } = useGlobalContext();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await api.post('/login', {
                email: email,
                senha: password
            })

            if (response.status > 204) {
                return
            }

            const { usuario, token } = response.data

            navigate('/main')

            setToken(token);
            setUser(usuario);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/main')
        }
    }, [])


    return (
        <div className='container-sign-in'>
            <form className='form-login' onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className='form-body'>
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
                </div>
                <div>
                    <button type="submit">Entrar</button>
                </div>
                <span>Primeira vez aqui?<Link to="/sign-up"> CRIE UMA CONTA</Link>
                </span>
            </form>
        </div>
    )
}

export default SignIn;