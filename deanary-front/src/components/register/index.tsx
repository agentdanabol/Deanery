import React, {useState} from "react";
import {register} from "../../api/user";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [fathername, setFathername] = useState("");
    const [group, setGroup] = useState(0);
    const [type, setType] = useState("");

    const handleRegister = async () => {
        try {
            const token = await register(username, password, firstname, lastname, fathername, group, type);
            console.log("Регистрация успешна");
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    const handleGroupChange = (event: any) => {
        setGroup(event.target.value);
    };

    return (
    <div className="register">
        <div className="form">
            <h1>Зарегистрироваться</h1>
            <form className="register-form">
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
                <label htmlFor="lastname">Фамилия</label>
                <input
                    type="text"
                    placeholder='Фамилия'
                    name='lastname'
                    required
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                />
                <label htmlFor="firstname">Имя</label>
                <input
                    type="text"
                    placeholder='Имя'
                    name='firstname'
                    required
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                />
                <label htmlFor="fathername">Отчество</label>
                <input
                    type="text"
                    placeholder='Отчество'
                    name='fathername'
                    value={fathername}
                    onChange={e => setFathername(e.target.value)}
                />
                <label htmlFor="group">Id группы</label>
                <input
                    type="text"
                    placeholder='Группа'
                    name='group'
                    value={group}
                    onChange={handleGroupChange}
                />
                <label htmlFor="type">Студент/Преподаватель</label>
                <input
                    type="text"
                    placeholder='Студент/Преподаватель'
                    name='type'
                    required
                    value={type}
                    onChange={e => setType(e.target.value)}
                />
                <button onClick={handleRegister}>Зарегистрироваться</button>
            </form>
        </div>
    </div>
    );

}