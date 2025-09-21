"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiUser,
  FiCalendar,
  FiTrash2,
  FiCheck,
  FiX,
  FiMessageSquare
} from "react-icons/fi";
import Link from "next/link";
import { mensagensApi } from "@/lib/api";

export default function MensagensAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'unread', 'read'

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session) {
      fetchMensagens();
    }
  }, [session]);

  const fetchMensagens = async () => {
    try {
      console.log("Buscando mensagens...");
      const data = await mensagensApi.getAll();
      console.log("Mensagens recebidas:", data);
      setMensagens(data);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      console.log("Tentando marcar mensagem como lida:", id);
      await mensagensApi.markAsRead(id);
      console.log("Mensagem marcada como lida com sucesso");
      await fetchMensagens();
    } catch (error) {
      console.error("Erro ao marcar mensagem como lida:", error);
      alert("Erro ao marcar mensagem como lida: " + error.message);
    }
  };

  const handleToggleReadStatus = async (id, currentStatus) => {
    try {
      console.log(
        `Tentando ${currentStatus ? "desmarcar" : "marcar"} mensagem como lida:`,
        id
      );
      // Por enquanto, só podemos marcar como lida usando o endpoint existente
      // Para desmarcar, vamos precisar implementar no backend
      if (!currentStatus) {
        // Se não está lida, marcar como lida
        await mensagensApi.markAsRead(id);
        console.log("Mensagem marcada como lida");
      } else {
        // Para desmarcar, vamos tentar usar o método toggle que criamos
        await mensagensApi.toggleReadStatus(id);
        console.log("Tentativa de desmarcar mensagem");
      }
      await fetchMensagens();
    } catch (error) {
      console.error("Erro ao alterar status da mensagem:", error);
      if (currentStatus) {
        alert(
          "Funcionalidade de desmarcar como lida ainda não está implementada no backend. Entre em contato com o desenvolvedor."
        );
      } else {
        alert("Erro ao marcar mensagem como lida: " + error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta mensagem?")) {
      try {
        await mensagensApi.delete(id);
        await fetchMensagens();
      } catch (error) {
        console.error("Erro ao excluir mensagem:", error);
        alert("Erro ao excluir mensagem");
      }
    }
  };

  const filteredMensagens = mensagens.filter((msg) => {
    if (filter === "unread") return !msg.read;
    if (filter === "read") return msg.read;
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const unreadCount = mensagens.filter((m) => !m.read).length;

  return (
    <section className="min-h-screen w-full max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <FiArrowLeft className="mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary">
              Mensagens de Contato
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-base text-muted-foreground">
                Total: {mensagens.length} mensagens
              </p>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  {unreadCount} não lidas
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex space-x-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Todas ({mensagens.length})
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            Não lidas ({unreadCount})
          </Button>
          <Button
            variant={filter === "read" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("read")}
          >
            Lidas ({mensagens.length - unreadCount})
          </Button>
        </div>
      </div>

      {/* Lista de Mensagens */}
      <div className="space-y-4">
        {filteredMensagens.map((mensagem) => (
          <Card
            key={mensagem.id}
            className={`shadow-sm ${!mensagem.read ? "border-l-4 border-l-yellow-500 bg-yellow-50/30" : "border-l-4 border-l-green-500 bg-green-50/30"}`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-3 h-3 rounded-full ${mensagem.read ? "bg-green-500" : "bg-yellow-500"}`}
                  />
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      <FiUser className="mr-2 text-muted-foreground" />
                      {mensagem.nome}
                      {!mensagem.read && (
                        <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          Nova
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <FiCalendar className="mr-1" />
                      {formatDate(mensagem.dataEnvio)}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAsRead(mensagem.id)}
                    className={
                      mensagem.read
                        ? "text-green-600 hover:bg-green-50 border-green-200"
                        : "text-yellow-600 hover:bg-yellow-50 border-yellow-200"
                    }
                    disabled={mensagem.read}
                  >
                    {mensagem.read ? (
                      <>
                        <FiCheck className="mr-1" />
                        Já lida
                      </>
                    ) : (
                      <>
                        <FiCheck className="mr-1" />
                        Marcar como lida
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(mensagem.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <FiTrash2 className="mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-muted-foreground">
                  <FiMail className="mr-2" />
                  <span className="text-sm">{mensagem.email}</span>
                </div>
                {mensagem.telefone && (
                  <div className="flex items-center text-muted-foreground">
                    <FiPhone className="mr-2" />
                    <span className="text-sm">{mensagem.telefone}</span>
                  </div>
                )}
              </div>

              {mensagem.assunto && (
                <div className="mb-3">
                  <strong className="text-sm">Assunto:</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    {mensagem.assunto}
                  </p>
                </div>
              )}

              <div className="mb-4">
                <strong className="text-sm flex items-center mb-2">
                  <FiMessageSquare className="mr-1" />
                  Mensagem:
                </strong>
                <div className="bg-accent/10 p-3 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">
                    {mensagem.mensagem}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMensagens.length === 0 && (
        <div className="text-center py-12">
          <FiMessageSquare className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {filter === "all"
              ? "Nenhuma mensagem encontrada"
              : filter === "unread"
                ? "Nenhuma mensagem não lida"
                : "Nenhuma mensagem lida"}
          </h3>
          <p className="text-muted-foreground">
            {filter === "all"
              ? "As mensagens enviadas pelo formulário de contato aparecerão aqui"
              : "Mude o filtro para ver outras mensagens"}
          </p>
        </div>
      )}
    </section>
  );
}
