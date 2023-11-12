import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/v1';

export async function fetchReports() {
    try {
        return await axios.get(`${API_BASE_URL}/export/xls`, { responseType: 'arraybuffer' });
    } catch (error) {
        throw error;
    }
}