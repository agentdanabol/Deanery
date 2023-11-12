import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {login} from "../../api/user";

export const Login = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    //const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const token = await login(username, password);
            // После успешной авторизации, сохраните пользователя в состоянии или Redux хранилище
            //dispatch({ type: 'LOGIN_SUCCESS', token });
            console.log('Авторизация успешна');
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        }
    };

    return (
        <>
        <div className="login">
            <div className="form">
                <h1>Войти в акканут</h1>
                <form className="login-form">
                    <label htmlFor="login">Логин</label>
                    <input
                        type="text"
                        placeholder='Логин'
                        name='login'
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        placeholder='Пароль'
                        name='password'
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Войти</button>
                </form>
            </div>
        </div>
        </>
    );
}