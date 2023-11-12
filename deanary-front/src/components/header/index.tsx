import React from "react";
import './style.css';
import {fetchReports} from "../../api/report";

function App() {
    const handleReports = async () => {
        await fetchReports().then(response => {
            const blob = new Blob([response.data], {type: 'application/octet-stream'});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'export.xls';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
            .catch(error => {
                console.error('Ошибка при скачивании файла:', error);
            });
    };


    return (
        <>
            <header>
                <div className="header__top">
                    <a href={"/"} className="main__title">
                        Система администрирования деканата
                    </a>
                    <div className="button__list">
                        <a href={"/register"} className="button__item">Регистрация</a>
                        <a href={"/login"} className="button__item">Авторизация</a>
                    </div>
                </div>
                <div className="nav__list">
                    <a href={"/people"} className="nav__item">Студенты и Преподаватели</a>
                    <a href={"/marks"} className="nav__item">Оценки</a>
                    <a href={"/groups"} className="nav__item">Группы</a>
                    <a href={"/subjects"} className="nav__item">Предметы</a>
                    <button onClick={handleReports} className="nav__item">Отчеты</button>
                </div>
            </header>
        </>
    );
}

export default App;