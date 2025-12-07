import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getTransactions = () => api.get('/transactions');
export const createTransaction = (transaction) => api.post('/transactions', transaction);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

export const getGoals = () => api.get('/goals');
export const createGoal = (goal) => api.post('/goals', goal);
export const updateGoal = (id, goal) => api.put(`/goals/${id}`, goal);
export const deleteGoal = (id) => api.delete(`/goals/${id}`);

export default api;
