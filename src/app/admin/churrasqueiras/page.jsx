"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiArrowLeft,
  FiSave,
  FiX,
  FiUsers,
  FiDollarSign
} from "react-icons/fi";
import Link from "next/link";
import { churrasqueirasApi } from "@/lib/api";

export default function ChurrasqueirasAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [churrasqueiras, setChurrasqueiras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("todas"); // 'todas', 'disponiveis', 'indisponiveis'
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    capacidade: "",
    preco: "",
    disponivel: true
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session) {
      fetchChurrasqueiras();
    }
  }, [session]);

  const fetchChurrasqueiras = async () => {
    try {
      const data = await churrasqueirasApi.getAll();
      setChurrasqueiras(data);
    } catch (error) {
      console.error("Erro ao carregar churrasqueiras:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Preparar dados convertendo strings para números
      const dataToSend = {
        nome: formData.nome,
        descricao: formData.descricao,
        capacidade: parseInt(formData.capacidade) || null,
        preco: parseFloat(formData.preco) || null,
        disponivel: formData.disponivel
      };

      console.log("Enviando dados:", dataToSend);

      if (editingId) {
        await churrasqueirasApi.update(editingId, dataToSend);
      } else {
        await churrasqueirasApi.create(dataToSend);
      }

      await fetchChurrasqueiras();
      resetForm();
      console.log("Churrasqueira salva com sucesso!");
    } catch (error) {
      console.error("Erro completo:", error);
      console.error("Mensagem do erro:", error.message);
      console.error("Stack do erro:", error.stack);
      alert(`Erro ao salvar churrasqueira: ${error.message}`);
    }
  };

  const handleEdit = (churrasqueira) => {
    setFormData({
      nome: churrasqueira.nome,
      descricao: churrasqueira.descricao,
      capacidade: churrasqueira.capacidade.toString(),
      preco: churrasqueira.preco.toString(),
      disponivel: churrasqueira.disponivel
    });
    setEditingId(churrasqueira.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta churrasqueira?")) {
      try {
        await churrasqueirasApi.delete(id);
        await fetchChurrasqueiras();
      } catch (error) {
        console.error("Erro ao excluir churrasqueira:", error);
        alert("Erro ao excluir churrasqueira");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      capacidade: "",
      preco: "",
      disponivel: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Filtrar churrasqueiras baseado no status selecionado
  const filteredChurrasqueiras = churrasqueiras.filter((churrasqueira) => {
    switch (statusFilter) {
      case "disponiveis":
        return churrasqueira.disponivel === true;
      case "indisponiveis":
        return churrasqueira.disponivel === false;
      default:
        return true;
    }
  });

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
              Gerenciar Churrasqueiras
            </h1>
            <p className="mt-1 text-base text-muted-foreground">
              Total: {churrasqueiras.length} churrasqueiras | Exibindo:{" "}
              {filteredChurrasqueiras.length}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="status-filter" className="text-sm font-medium">
              Filtrar:
            </Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="disponiveis">Disponíveis</SelectItem>
                <SelectItem value="indisponiveis">Indisponíveis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2"
          >
            <FiPlus />
            <span>Nova Churrasqueira</span>
          </Button>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <Card className="shadow-sm mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {editingId ? "Editar Churrasqueira" : "Nova Churrasqueira"}
              </h2>
              <Button variant="outline" onClick={resetForm}>
                <FiX className="mr-2" />
                Cancelar
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nome" className="text-base">
                    Nome *
                  </Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, nome: e.target.value }))
                    }
                    className="mt-2 h-10 bg-white shadow-none"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="capacidade" className="text-base">
                    Capacidade (pessoas) *
                  </Label>
                  <Input
                    id="capacidade"
                    type="number"
                    value={formData.capacidade}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        capacidade: e.target.value
                      }))
                    }
                    className="mt-2 h-10 bg-white shadow-none"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="preco" className="text-base">
                    Preço (R$) *
                  </Label>
                  <Input
                    id="preco"
                    type="number"
                    step="0.01"
                    value={formData.preco}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        preco: e.target.value
                      }))
                    }
                    className="mt-2 h-10 bg-white shadow-none"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="descricao" className="text-base">
                  Descrição
                </Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      descricao: e.target.value
                    }))
                  }
                  className="mt-2 bg-white shadow-none"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="disponivel"
                  checked={formData.disponivel}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, disponivel: checked }))
                  }
                  className="bg-background"
                />
                <Label htmlFor="disponivel" className="text-base">
                  Disponível para reserva
                </Label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit">
                  <FiSave className="mr-2" />
                  {editingId ? "Atualizar" : "Criar"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Churrasqueiras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChurrasqueiras.map((churrasqueira) => (
          <Card
            key={churrasqueira.id}
            className="shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{churrasqueira.nome}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    churrasqueira.disponivel
                      ? "bg-accent/20 text-accent-foreground"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {churrasqueira.disponivel ? "Disponível" : "Indisponível"}
                </span>
              </div>

              <p className="text-muted-foreground text-sm mb-4">
                {churrasqueira.descricao}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-muted-foreground">
                  <FiUsers className="mr-1" />
                  <span className="text-sm">
                    {churrasqueira.capacidade} pessoas
                  </span>
                </div>
                <div className="flex items-center text-primary">
                  <FiDollarSign className="mr-1" />
                  <span className="font-semibold">
                    R$ {churrasqueira.preco.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(churrasqueira)}
                  className="flex-1"
                >
                  <FiEdit className="mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(churrasqueira.id)}
                  className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <FiTrash2 className="mr-2" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChurrasqueiras.length === 0 && churrasqueiras.length > 0 && (
        <div className="text-center py-12 col-span-full">
          <FiUsers className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Nenhuma churrasqueira encontrada
          </h3>
          <p className="text-muted-foreground mb-6">
            Nenhuma churrasqueira corresponde ao filtro selecionado
          </p>
        </div>
      )}

      {churrasqueiras.length === 0 && (
        <div className="text-center py-12">
          <FiUsers className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Nenhuma churrasqueira cadastrada
          </h3>
          <p className="text-muted-foreground mb-6">
            Adicione a primeira churrasqueira para começar
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2"
          >
            <FiPlus />
            <span>Nova Churrasqueira</span>
          </Button>
        </div>
      )}
    </section>
  );
}
