import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';
const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
};

export async function fetchMarks() {
    try {
        return await axios.get(`${API_BASE_URL}/marks/`);
    } catch (error) {
        throw error;
    }
}

export async function fetchMarkById(id: number) {
    try {
        return await axios.get(`${API_BASE_URL}/marks/${id}`);
    } catch (error) {
        throw error;
    }
}

export async function addMark(value: number, student: number, subject: number, teacher: number ) {
    const data = {
        value: value,
        student: student,
        subject: subject,
        teacher: teacher,
    };
    try {
        const response = await axios.post(`${API_BASE_URL}/marks/create`, data, {headers});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteMark(id: number) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/marks/delete?id=${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}