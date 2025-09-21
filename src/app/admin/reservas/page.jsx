"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FiArrowLeft,
  FiCalendar,
  FiUser,
  FiMail,
  FiPhone,
  FiUsers,
  FiTrash2,
  FiEdit3
} from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Link from "next/link";

export default function ReservasAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'pendente', 'confirmada', 'cancelada'

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session) {
      fetchReservas();
    }
  }, [session]);

  const fetchReservas = async () => {
    try {
      const response = await fetch("http://localhost:3001/reservas");
      const data = await response.json();
      setReservas(data);
    } catch (error) {
      console.error("Erro ao carregar reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReserva = async (id) => {
    if (
      confirm(
        "Tem certeza que deseja excluir esta reserva? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        const response = await fetch(`http://localhost:3001/reservas/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) throw new Error("Erro ao excluir reserva");

        setReservas((prev) => prev.filter((r) => r.id !== id));
      } catch (error) {
        console.error("Erro ao excluir reserva:", error);
        alert("Erro ao excluir reserva");
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/reservas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error("Erro ao alterar status da reserva");

      // Atualizar a lista de reservas
      await fetchReservas();
    } catch (err) {
      console.error("Erro ao alterar status da reserva:", err);
      alert("Erro ao alterar status da reserva");
    }
  };

  const filteredReservas = reservas.filter((reserva) => {
    if (filter === "pendente") return reserva.status === "pendente";
    if (filter === "confirmada") return reserva.status === "confirmada";
    if (filter === "cancelada") return reserva.status === "cancelada";
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  const pendenteCount = reservas.filter((r) => r.status === "pendente").length;
  const confirmadaCount = reservas.filter(
    (r) => r.status === "confirmada"
  ).length;
  const cancelledCount = reservas.filter(
    (r) => r.status === "cancelada"
  ).length;

  const getStatusColor = (status) => {
    switch (status) {
      case "pendente":
        return "border-l-yellow-400 bg-yellow-50/50";
      case "confirmada":
        return "border-l-green-400 bg-green-50/50";
      case "cancelada":
        return "border-l-red-400 bg-red-50/50";
      default:
        return "border-l-gray-400";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "confirmada":
        return "bg-green-100 text-green-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <section className="min-h-screen w-full max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="flex items-center">
              <FiArrowLeft className="mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary">
              Gerenciar Reservas
            </h1>
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <p className="text-base text-muted-foreground">
                Total: {reservas.length} reservas
              </p>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                {pendenteCount} pendentes
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {confirmadaCount} confirmadas
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                {cancelledCount} canceladas
              </span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Todas ({reservas.length})
          </Button>
          <Button
            variant={filter === "pendente" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pendente")}
            className={
              filter === "pendente"
                ? ""
                : "text-yellow-700 border-yellow-300 hover:bg-yellow-50"
            }
          >
            Pendentes ({pendenteCount})
          </Button>
          <Button
            variant={filter === "confirmada" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("confirmada")}
            className={
              filter === "confirmada"
                ? ""
                : "text-green-700 border-green-300 hover:bg-green-50"
            }
          >
            Confirmadas ({confirmadaCount})
          </Button>
          <Button
            variant={filter === "cancelada" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("cancelada")}
            className={
              filter === "cancelada"
                ? ""
                : "text-red-700 border-red-300 hover:bg-red-50"
            }
          >
            Canceladas ({cancelledCount})
          </Button>
        </div>
      </div>

      {/* Lista de Reservas */}
      <div className="space-y-4">
        {filteredReservas.map((reserva) => (
          <Card
            key={reserva.id}
            className={`shadow-sm border-l-4 ${getStatusColor(reserva.status)}`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center flex-wrap gap-2">
                    <FiUser className="text-muted-foreground" />
                    {reserva.nome}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(reserva.status)}`}
                    >
                      {reserva.status === "pendente"
                        ? "Pendente"
                        : reserva.status === "confirmada"
                          ? "Confirmada"
                          : "Cancelada"}
                    </span>
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <FiCalendar className="mr-1" />
                    Criada em: {formatDate(reserva.createdAt)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Data da reserva:{" "}
                    {new Date(reserva.data).toLocaleDateString("pt-BR")}
                    {reserva.horario && ` às ${reserva.horario}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Churrasqueira: {reserva.churrasqueira?.nome || "N/A"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <FiMail className="mr-2" />
                  {reserva.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <FiPhone className="mr-2" />
                  {reserva.telefone || "N/A"}
                </div>
                {reserva.pessoas && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FiUsers className="mr-2" />
                    {reserva.pessoas} pessoas
                  </div>
                )}
                {reserva.cpf && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    CPF: {reserva.cpf}
                  </div>
                )}
              </div>

              {reserva.observacoes && (
                <div className="bg-gray-50 rounded-lg p-3 mt-4">
                  <p className="text-sm text-muted-foreground font-medium mb-1">
                    Observações:
                  </p>
                  <p className="text-sm">{reserva.observacoes}</p>
                </div>
              )}

              {/* Ações */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">
                    Alterar Status:
                  </label>
                  <Select
                    value={reserva.status}
                    onValueChange={(newStatus) =>
                      handleStatusChange(reserva.id, newStatus)
                    }
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          Pendente
                        </div>
                      </SelectItem>
                      <SelectItem value="confirmada">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          Confirmada
                        </div>
                      </SelectItem>
                      <SelectItem value="cancelada">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          Cancelada
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteReserva(reserva.id)}
                  className="flex items-center gap-2"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReservas.length === 0 && (
        <div className="text-center py-12">
          <FiCalendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {filter === "all"
              ? "Nenhuma reserva encontrada"
              : filter === "pendente"
                ? "Nenhuma reserva pendente"
                : filter === "confirmada"
                  ? "Nenhuma reserva confirmada"
                  : "Nenhuma reserva cancelada"}
          </h3>
          <p className="text-muted-foreground">
            {filter === "all"
              ? "As reservas feitas pelo site aparecerão aqui"
              : "Mude o filtro para ver outras reservas"}
          </p>
        </div>
      )}
    </section>
  );
}
