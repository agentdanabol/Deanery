import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';
const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
};

export async function fetchGroups() {
    try {
        return await axios.get(`${API_BASE_URL}/groups/`);
    } catch (error) {
        throw error;
    }
}

export async function fetchGroupById(id: number) {
    try {
        return await axios.get(`${API_BASE_URL}/groups/${id}`);
    } catch (error) {
        throw error;
    }
}

export async function addGroup(name: string, year: number) {
    const data = {
        name: name,
        year: year,
    };
    try {
        const response = await axios.post(`${API_BASE_URL}/groups/create`, data, {headers});
        return response.data;
    } catch (error) {
        throw error;
    }
}
