import { apiClient } from './client.js';

export const reservasApi = {
  // Buscar todas as reservas
  async getAll() {
    return await apiClient.get('/reservas');
  },

  // Buscar reserva por ID
  async getById(id) {
    return await apiClient.get(`/reservas/${id}`);
  },

  // Criar nova reserva (endpoint público para o formulário do site)
  async create(data) {
    return await apiClient.post('/reservas', data);
  },

  // Atualizar reserva
  async update(id, data) {
    return await apiClient.put(`/reservas/${id}`, data);
  },

  // Cancelar reserva
  async cancel(id) {
    return await apiClient.patch(`/reservas/${id}/cancel`, {});
  },

  // Excluir reserva
  async delete(id) {
    return await apiClient.delete(`/reservas/${id}`);
  },

  // Buscar reservas por status
  async getByStatus(status) {
    return await apiClient.get(`/reservas?status=${status}`);
  },

  // Buscar reservas por data
  async getByDate(date) {
    return await apiClient.get(`/reservas?date=${date}`);
  },

  // Verificar disponibilidade
  async checkAvailability(churrasqueiraId, date, horario) {
    return await apiClient.get(`/reservas/availability?churrasqueiraId=${churrasqueiraId}&date=${date}&horario=${horario}`);
  }
};