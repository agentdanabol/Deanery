import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {addMark, deleteMark, fetchMarkById, fetchMarks} from "../../api/mark";

interface Mark {
    id: number,
    value: number,
    student: number,
    teacher: number,
    subject: number

}
export const Marks = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    const [marks, setMarks] = useState<Mark[]>([]);

    const [newMarkValue, setNewMarkValue] = useState(0);
    const [newMarkStudent, setNewMarkStudent] = useState(0);
    const [newMarkSubject, setNewMarkSubject] = useState(0);
    const [newMarkTeacher, setNewMarkTeacher] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMarks();
                setMarks(response.data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        fetchData();
    }, []);

    const handleAddMark = async () => {
        try {
            const response: number = await addMark(newMarkValue, newMarkStudent, newMarkSubject, newMarkTeacher);
            const newMarkData = await fetchMarkById(response);

            setMarks([...marks, newMarkData.data]);
            setNewMarkValue(0);
            setNewMarkStudent(0);
            setNewMarkSubject(0);
            setNewMarkTeacher(0);
        } catch (error) {
            console.error('Ошибка при создании оценки:', error);
        }
    };

    const handleNewMarkValue = (event: any) => {
        setNewMarkValue(event.target.value);
    };

    const handleNewMarkStudent = (event: any) => {
        setNewMarkStudent(event.target.value);
    };

    const handleNewMarkSubject = (event: any) => {
        setNewMarkSubject(event.target.value);
    };

    const handleNewMarkTeacher = (event: any) => {
        setNewMarkTeacher(event.target.value);
    };

    if (!isAuthenticated) {
        return (
            <Navigate to="/login"/>
        );
    }

    const handleDeleteMark = async (deleteId : number) => {
        try {
            await deleteMark(deleteId);
            setMarks(marks.filter((mark) => mark.id !== deleteId));
        } catch (error) {
            console.error('Ошибка при удалении оценки:', error);
        }
    };

    return (
        <>
            <h2>Оценки</h2>
            <div className='table marks__table'>
                <ul>
                    {marks.map((mark: Mark) => (
                        <li key={mark.id}>
                            <span>Оценка: {mark.value}</span>
                            <span>Студент: {mark.student}</span>
                            <span>Предмет: {mark.subject}</span>
                            <span>Преподаватель: {mark.teacher}</span>
                            <button className="delete__btn" onClick={() => handleDeleteMark(mark.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
                <form>
                    <label htmlFor="value">Оценка</label>
                    <input
                        type="text"
                        placeholder="Оценка"
                        name="value"
                        required
                        value={newMarkValue}
                        onChange={handleNewMarkValue}
                    />
                    <label htmlFor="student">Id студента</label>
                    <input
                        type="text"
                        placeholder="Студент"
                        name="student"
                        required
                        value={newMarkStudent}
                        onChange={handleNewMarkStudent}
                    />
                    <label htmlFor="subject">Id предмета</label>
                    <input
                        type="text"
                        placeholder="Предмет"
                        name="subject"
                        required
                        value={newMarkSubject}
                        onChange={handleNewMarkSubject}
                    />
                    <label htmlFor="teacher">Id преподавателя</label>
                    <input
                        type="text"
                        placeholder="Преподаватель"
                        name="teacher"
                        required
                        value={newMarkTeacher}
                        onChange={handleNewMarkTeacher}
                    />
                    <button onClick={handleAddMark}>Добавить</button>
                </form>
            </div>
        </>
    );
};
