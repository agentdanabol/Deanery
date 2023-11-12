import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {Register} from "./components/register";
import {Login} from "./components/login";
import {Marks} from "./components/mark";
import {People} from "./components/person";
import {Groups} from "./components/group";
import {Subjects} from "./components/subject";
import Header from "./components/header";

function App() {
    const isAuthenticated = localStorage.getItem('token') !== null;
    if (!isAuthenticated) {
        return (
            <>
                <Header></Header>
                <h1>Вы не авторизованы!</h1>
                <div className="container">
                    <Router>
                        <div>
                            <Routes>
                                <Route path="/login" Component={Login}/>
                                <Route path="/register" Component={Register}/>
                                <Route path="/people" Component={People}/>
                                <Route path="/marks" Component={Marks}/>
                                <Route path="/groups" Component={Groups}/>
                                <Route path="/subjects" Component={Subjects}/>
                            </Routes>
                        </div>
                    </Router>
                </div>
            </>
        );
    }
    return (
        <>
            <Header></Header>
            <div className="container">
                <Router>
                    <div>
                        <Routes>
                            <Route path="/login" Component={Login}/>
                            <Route path="/register" Component={Register}/>
                            <Route path="/people" Component={People}/>
                            <Route path="/marks" Component={Marks}/>
                            <Route path="/groups" Component={Groups}/>
                            <Route path="/subjects" Component={Subjects}/>
                        </Routes>
                    </div>
                </Router>
            </div>
        </>
    );
}

export default App;
