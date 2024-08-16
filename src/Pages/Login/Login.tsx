import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../../Context/AuthContext';
import UsuarioLogin from '../../Models/UsuarioLogin';
import './Login.css';

function Login() {
    let navigate = useNavigate();
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token) {
            navigate('/home');
        }
    }, [usuario.token, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });
    }

    async function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        await handleLogin(usuarioLogin);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
            <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
                <h2 className="text-5xl text-white">Entrar</h2>
                <div className="flex flex-col w-full">
                    <label htmlFor="usuario">Usuário</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Usuario"
                        className="border-2 border-slate-700 rounded p-2"
                        value={usuarioLogin.usuario || ''}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Senha"
                        className="border-2 border-slate-700 rounded p-2"
                        value={usuarioLogin.senha || ''}
                        onChange={atualizarEstado}
                    />
                </div>
                <button
                    type="submit"
                    className="rounded bg-green-600 hover:bg-green-900 text-white w-1/2 py-2 flex justify-center"
                >
                    {isLoading ? (
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    ) : (
                        <span>Entrar</span>
                    )}
                </button>

                <hr className="border-slate-800 w-full" />

                <p className='text-white'>
                    Ainda não tem uma conta?{' '}
                    <Link to="/cadastro" className="text-green-800 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </form>
            <div className="fundoLogin hidden lg:block"></div>
        </div>
    );
}

export default Login;
