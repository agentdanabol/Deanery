import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';
const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
};

export async function fetchSubjects() {
    try {
        return await axios.get(`${API_BASE_URL}/subjects/`);
    } catch (error) {
        throw error;
    }
}

export async function fetchSubjectById(id: number) {
    try {
        return await axios.get(`${API_BASE_URL}/subjects/${id}`);
    } catch (error) {
        throw error;
    }
}

export async function addSubject(name: string) {
    const data = {
        name: name
    };
    try {
        const response = await axios.post(`${API_BASE_URL}/subjects/create`, data, {headers});
        return response.data;
    } catch (error) {
        throw error;
    }
}
