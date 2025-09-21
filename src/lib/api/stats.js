import { apiClient } from "./client.js";

export const statsApi = {
  // Buscar estatísticas do dashboard
  async getDashboardStats() {
    return await apiClient.get("/admin/stats");
  },

  // Estatísticas de reservas
  async getReservasStats() {
    return await apiClient.get("/admin/stats/reservas");
  },

  // Estatísticas de churrasqueiras
  async getChurrasqueirasStats() {
    return await apiClient.get("/admin/stats/churrasqueiras");
  },

  // Estatísticas de mensagens
  async getMensagensStats() {
    return await apiClient.get("/admin/stats/mensagens");
  }
};
