import { apiClient } from './client.js';

export const churrasqueirasApi = {
  // Buscar todas as churrasqueiras
  async getAll() {
    return await apiClient.get('/churrasqueiras');
  },

  // Buscar churrasqueira por ID
  async getById(id) {
    return await apiClient.get(`/churrasqueiras/${id}`);
  },

  // Criar nova churrasqueira
  async create(data) {
    return await apiClient.post('/churrasqueiras', data);
  },

  // Atualizar churrasqueira
  async update(id, data) {
    return await apiClient.put(`/churrasqueiras/${id}`, data);
  },

  // Excluir churrasqueira
  async delete(id) {
    return await apiClient.delete(`/churrasqueiras/${id}`);
  },

  // Buscar churrasqueiras disponíveis para uma data
  async getAvailable(date) {
    return await apiClient.get(`/churrasqueiras/available?date=${date}`);
  }
};