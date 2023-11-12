import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';
const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
};

// Функция для выполнения POST-запроса для авторизации
export async function login(username: string, password: string) {
    const data = {
        username: username,
        password: password,
    };
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, data, {headers});
        return response.data.token;
    } catch (error) {
        throw error;
    }
}

// Функция для выполнения POST-запроса для регистрации
export async function register(username: string, password: string, firstname: string, lastname: string,
                               fathername: string, group: number, type: string) {
    const data = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        fathername: fathername,
        group: group,
        type: type
    };
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, data, {headers});
        return response.data.token;
    } catch (error) {
        throw error;
    }
}

export async function fetchPersonById(id: number) {
    try {
        return await axios.get(`${API_BASE_URL}/users/${id}`);
    } catch (error) {
        throw error;
    }
}

export async function fetchPeople() {
    try {
        return await axios.get(`${API_BASE_URL}/users/`);
    } catch (error) {
        throw error;
    }
}

// Функция для выполнения PUT-запроса для обновления объекта по ID
export async function updatePerson(id: number, data: any) {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}


