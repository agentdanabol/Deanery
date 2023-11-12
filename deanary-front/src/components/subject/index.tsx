import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {addSubject, fetchSubjectById, fetchSubjects} from "../../api/subject";

interface Subject {
    id: number,
    name: string,
}

export const Subjects = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [newSubjectName, setNewSubjectName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchSubjects();
                setSubjects(response.data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubjectNameChange = (event: any) => {
        setNewSubjectName(event.target.value);
    };

    const handleAddSubject = async () => {
        try {
            const response: number = await addSubject(newSubjectName);
            const newSubjectData = await fetchSubjectById(response);

            setSubjects([...subjects, newSubjectData.data]);
            setNewSubjectName('');
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
            <h2>Предметы</h2>
            <div className='table subjects__table'>
                <ul>
                    {subjects.map((subject: Subject) => (
                        <li key={subject.id}>
                            <span>Название: {subject.name}</span>
                        </li>
                    ))}
                </ul>
                <form>
                    <label htmlFor="subject">Название предмета</label>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Название предмета"
                        required
                        value={newSubjectName}
                        onChange={handleSubjectNameChange}
                    />
                    <button onClick={handleAddSubject}>Добавить</button>
                </form>
            </div>
        </>
    );
};
