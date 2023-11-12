import React, {useEffect, useState} from 'react';
import {fetchPeople, updatePerson} from "../../api/user";

interface Person {
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    fathername: string,
    group: number,
    type: any
}
export const People = () => {
    const [people, setPeople] = useState([]);

    const[id, setId] = useState(0);
    const[firstname, setFirstname] = useState('');
    const[lastname, setLastname] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchPeople();
                setPeople(response.data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        fetchData();
    }, []);

    const handleUpdatePerson = async () => {
        try {
            const person = {
                firstname: firstname,
                lastname: lastname,
            }
            await updatePerson(id, person);
            console.log("Редактирование успешно");
        } catch (error) {
            console.error('Ошибка редактирования:', error);
        }
    };

    const handleSetId = (event: any) => {
        setId(event.target.value);
    };

    return (
        <>
            <h2>Пользователи электронной системы</h2>
            <div className='table people__table'>
                <ul>
                    {people.map((person : Person) => (
                        <li key={person.id}>
                            <span>Никнейм: {person.username}</span>
                            <span>Фамилия: {person.lastname}</span>
                            <span>Имя: {person.firstname}</span>
                            <span>Отчество: {person.fathername}</span>
                            <span>Номер группы: {person.group}</span>
                            <span>Тип: {person.type}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <h2>Обновление данных пользователя</h2>
            <form>
                <label htmlFor="id">Id пользователя</label>
                <input
                    type="text"
                    placeholder="Id"
                    name="id"
                    required
                    value={id}
                    onChange={handleSetId}
                />
                <label htmlFor="lastname">Новая фамилия</label>
                <input
                    type="text"
                    placeholder="Фамилия"
                    name="lastname"
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                />
                <label htmlFor="firstname">Новое имя</label>
                <input
                    type="text"
                    placeholder="Имя"
                    name="firstname"
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                />
                <button onClick={handleUpdatePerson}>Изменить</button>
            </form>
        </>
    );
};
