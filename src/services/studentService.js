import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

export const getAllStudents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addStudent = async (student) => {
    await axios.post(API_URL, student);
};

export const deleteStudent = async (ma_sv) => {
    await axios.delete(`${API_URL}/${ma_sv}`);
};

export const updateStudent = async (ma_sv, student) => {
    const response = await axios.put(`${API_URL}/${ma_sv}`, student);
    return response.data;
}