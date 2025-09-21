"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Edit,
  Trash2
} from "lucide-react";
import { reservasApi } from "@/lib/api";

export default function GerenciarReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const data = await reservasApi.getAll();
      setReservas(data);
    } catch (err) {
      setError("Erro ao carregar reservas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await reservasApi.update(id, { status: newStatus.toLowerCase() });
      // Atualizar a lista de reservas
      await fetchReservas();
    } catch (err) {
      setError(`Erro ao alterar status da reserva`);
      console.error(err);
    }
  };

  const handleDeleteReserva = async (id) => {
    if (
      confirm(
        "Tem certeza que deseja excluir esta reserva? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        await reservasApi.delete(id);
        // Atualizar a lista de reservas
        await fetchReservas();
      } catch (err) {
        setError("Erro ao excluir reserva");
        console.error(err);
      }
    }
  };

  const getStatusBadge = (status) => {
    // Normalizar para maiúsculo para compatibilidade
    const normalizedStatus = status?.toString().toUpperCase();

    const statusConfig = {
      PENDENTE: {
        variant: "secondary",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock
      },
      CONFIRMADA: {
        variant: "default",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle
      },
      CANCELADA: {
        variant: "destructive",
        color: "bg-red-100 text-red-800",
        icon: XCircle
      }
    };

    const config = statusConfig[normalizedStatus] || statusConfig["PENDENTE"];
    const IconComponent = config.icon;

    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {normalizedStatus}
      </Badge>
    );
  };

  const filterReservasByStatus = (status) => {
    return reservas.filter(
      (reserva) =>
        reserva.status?.toString().toUpperCase() === status.toUpperCase()
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const ReservaCard = ({ reserva }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              {reserva.nomeCompleto}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {reserva.churrasqueira?.nome || "Churrasqueira N/A"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(reserva.data)}
              </span>
              {reserva.horario && <span>às {reserva.horario}</span>}
            </CardDescription>
          </div>
          {getStatusBadge(reserva.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Contato</p>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              {reserva.telefone}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              {reserva.email}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Detalhes</p>
            <p className="text-sm">CPF: {reserva.cpf}</p>
            <p className="text-sm">
              Criada em: {formatDate(reserva.createdAt)}
            </p>
          </div>
        </div>

        {reserva.observacoes && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Observações</p>
            <p className="text-sm bg-gray-50 p-2 rounded">
              {reserva.observacoes}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Alterar Status:
            </label>
            <Select
              value={reserva.status?.toString().toUpperCase()}
              onValueChange={(newStatus) =>
                handleStatusChange(reserva.id, newStatus)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDENTE">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    Pendente
                  </div>
                </SelectItem>
                <SelectItem value="CONFIRMADA">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Confirmada
                  </div>
                </SelectItem>
                <SelectItem value="CANCELADA">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    Cancelada
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Ação:
            </label>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteReserva(reserva.id)}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Excluir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Gerenciar Reservas
        </h1>
        <p className="text-gray-600">Administre todas as reservas do sistema</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <Tabs defaultValue="pendentes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pendentes" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pendentes ({filterReservasByStatus("PENDENTE").length})
          </TabsTrigger>
          <TabsTrigger value="confirmadas" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Confirmadas ({filterReservasByStatus("CONFIRMADA").length})
          </TabsTrigger>
          <TabsTrigger value="canceladas" className="flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Canceladas ({filterReservasByStatus("CANCELADA").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-yellow-700">
              Reservas Pendentes
            </h2>
            <p className="text-gray-600">Reservas aguardando aprovação</p>
          </div>
          {filterReservasByStatus("PENDENTE").length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Nenhuma reserva pendente</p>
              </CardContent>
            </Card>
          ) : (
            filterReservasByStatus("PENDENTE").map((reserva) => (
              <ReservaCard key={reserva.id} reserva={reserva} />
            ))
          )}
        </TabsContent>

        <TabsContent value="confirmadas" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-green-700">
              Reservas Confirmadas
            </h2>
            <p className="text-gray-600">Reservas aprovadas e ativas</p>
          </div>
          {filterReservasByStatus("CONFIRMADA").length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <CheckCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Nenhuma reserva confirmada</p>
              </CardContent>
            </Card>
          ) : (
            filterReservasByStatus("CONFIRMADA").map((reserva) => (
              <ReservaCard key={reserva.id} reserva={reserva} />
            ))
          )}
        </TabsContent>

        <TabsContent value="canceladas" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-red-700">
              Reservas Canceladas
            </h2>
            <p className="text-gray-600">Reservas que foram canceladas</p>
          </div>
          {filterReservasByStatus("CANCELADA").length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <XCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Nenhuma reserva cancelada</p>
              </CardContent>
            </Card>
          ) : (
            filterReservasByStatus("CANCELADA").map((reserva) => (
              <ReservaCard key={reserva.id} reserva={reserva} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
