import { apiClient } from './client.js';

export const mensagensApi = {
  // Buscar todas as mensagens
  async getAll() {
    return await apiClient.get('/mensagens');
  },

  // Buscar mensagem por ID
  async getById(id) {
    return await apiClient.get(`/mensagens/${id}`);
  },

  // Criar nova mensagem (endpoint público para o formulário de contato)
  async create(data) {
    return await apiClient.post('/mensagens', data);
  },

  // Marcar mensagem como lida
  async markAsRead(id) {
    return await apiClient.patch(`/mensagens/${id}/read`, {});
  },

  // Marcar mensagem como não lida (usando o mesmo endpoint com toggle)
  async markAsUnread(id) {
    // Como não existe endpoint específico, vamos usar o /read novamente
    // O backend deve implementar uma lógica de toggle
    return await apiClient.patch(`/mensagens/${id}/read`, { toggle: true });
  },

  // Alternar status de lida/não lida
  async toggleReadStatus(id) {
    return await apiClient.patch(`/mensagens/${id}/read`, { toggle: true });
  },

  // Excluir mensagem
  async delete(id) {
    return await apiClient.delete(`/mensagens/${id}`);
  },

  // Buscar mensagens não lidas
  async getUnread() {
    return await apiClient.get('/mensagens?read=false');
  },

  // Buscar mensagens por status
  async getByStatus(read = true) {
    return await apiClient.get(`/mensagens?read=${read}`);
  }
};