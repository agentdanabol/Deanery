import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {addGroup, fetchGroupById, fetchGroups} from "../../api/group";

interface Group {
    id: number,
    name: string,
    year: number
}

export const Groups = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    const [groups, setGroups] = useState<Group[]>([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupYear, setNewGroupYear] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchGroups();
                setGroups(response.data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        fetchData();
    }, []);

    const handleGroupNameChange = (event: any) => {
        setNewGroupName(event.target.value);
    };
    const handleGroupYearChange = (event: any) => {
        setNewGroupYear(event.target.value);
    };

    const handleAddGroup = async () => {
        try {
            const response: number = await addGroup(newGroupName, newGroupYear);
            const newGroupData = await fetchGroupById(response);

            setGroups([...groups, newGroupData.data]);
            setNewGroupName('');
            setNewGroupYear(0);
        } catch (error) {
            console.error('Ошибка при создании оценки:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <Navigate to="/login"/>
        );
    }

    return (
        <>
            <h2>Группы</h2>
            <div className='table groups__table'>
                <ul>
                    {groups.map((group: Group) => (
                        <li key={group.id}>
                            <span>Название: {group.name}</span>
                            <span>Курс: {group.year}</span>
                        </li>
                    ))}
                </ul>
                <form>
                    <label htmlFor="name">Название группы</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Название группы"
                        value={newGroupName}
                        onChange={handleGroupNameChange}
                    />
                    <label htmlFor="year">Курс группы</label>
                    <input
                        type="text"
                        name="year"
                        placeholder="Курс группы"
                        value={newGroupYear}
                        onChange={handleGroupYearChange}
                    />
                    <button onClick={handleAddGroup}>Добавить</button>
                </form>
            </div>
        </>
    );
};
