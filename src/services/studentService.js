import axios from "axios";

const API_URL = "https://67da20eb35c87309f52b0f6e.mockapi.io/students";

export const getAllStudents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addStudent = async (student) => {
    await axios.post(API_URL, student); 
};

export const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateStudent = async (id, student) => {
    const response = await axios.put(`${API_URL}/${id}`, student);
    return response.data;
}