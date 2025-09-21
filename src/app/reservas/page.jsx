"use client";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { churrasqueirasApi, reservasApi } from "@/lib/api";

const Reservas = () => {
  const [date, setDate] = useState(null);
  const [etapa, setEtapa] = useState("data"); // "data", "churrasqueira", "formulario", "confirmacao"
  const [churrasqueiraSelecionada, setChurrasqueiraSelecionada] =
    useState(null);
  const [churrasqueirasDisponiveis, setChurrasqueirasDisponiveis] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    pessoas: "",
    observacoes: ""
  });
  const [reservaCompleta, setReservaCompleta] = useState(false);

  useEffect(() => {
    fetchChurrasqueiras();
  }, []);

  const fetchChurrasqueiras = async () => {
    try {
      const data = await churrasqueirasApi.getAll();
      // Filtrar apenas churrasqueiras disponíveis
      const disponiveis = data.filter((c) => c.disponivel);
      setChurrasqueirasDisponiveis(disponiveis);
    } catch (error) {
      console.error("Erro ao carregar churrasqueiras:", error);
    }
  };

  const fetchChurrasqueirasDisponiveis = async (selectedDate) => {
    try {
      setLoading(true);
      const dateString = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      const data = await churrasqueirasApi.getAvailable(dateString);
      setChurrasqueirasDisponiveis(data);
    } catch (error) {
      console.error("Erro ao carregar churrasqueiras disponíveis:", error);
      alert("Erro ao carregar churrasqueiras disponíveis para esta data.");
      setChurrasqueirasDisponiveis([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDate = (selectedDate) => {
    setDate(selectedDate);
    fetchChurrasqueirasDisponiveis(selectedDate);
    setEtapa("churrasqueira");
  };

  const handleSelectChurrasqueira = (churrasqueira) => {
    setChurrasqueiraSelecionada(churrasqueira);
    setEtapa("formulario");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.email ||
      !formData.pessoas ||
      !formData.cpf ||
      !formData.telefone
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      // Verificar novamente se a churrasqueira ainda está disponível
      const dateString = date.toISOString().split("T")[0];
      const churrasqueirasDisponiveis =
        await churrasqueirasApi.getAvailable(dateString);
      const churrasqueiraAindaDisponivel = churrasqueirasDisponiveis.find(
        (c) => c.id === churrasqueiraSelecionada.id
      );

      if (!churrasqueiraAindaDisponivel) {
        alert(
          "Esta churrasqueira não está mais disponível para a data selecionada. Por favor, escolha outra."
        );
        setEtapa("churrasqueira");
        await fetchChurrasqueirasDisponiveis(date);
        return;
      }

      await reservasApi.create({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        cpf: formData.cpf,
        data: dateString,
        churrasqueiraId: churrasqueiraSelecionada.id,
        pessoas: parseInt(formData.pessoas),
        observacoes: formData.observacoes
      });

      setReservaCompleta(true);
      setEtapa("confirmacao");
    } catch (error) {
      console.error("Erro:", error);
      if (error.message.includes("409") || error.message.includes("Conflict")) {
        alert(
          "Esta churrasqueira já foi reservada por outra pessoa. Por favor, escolha outra churrasqueira."
        );
        setEtapa("churrasqueira");
        await fetchChurrasqueirasDisponiveis(date);
      } else {
        alert("Erro ao fazer reserva. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const voltarParaData = () => {
    setEtapa("data");
    setChurrasqueiraSelecionada(null);
  };

  const voltarParaChurrasqueira = async () => {
    setEtapa("churrasqueira");
    // Atualizar lista de churrasqueiras disponíveis ao voltar
    if (date) {
      await fetchChurrasqueirasDisponiveis(date);
    }
  };

  const formatarData = (data) => {
    if (!data) return "";
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(data);
  };

  const novaReserva = () => {
    setDate(null);
    setChurrasqueiraSelecionada(null);
    setFormData({
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      pessoas: "",
      observacoes: ""
    });
    setReservaCompleta(false);
    setEtapa("data");
  };

  return (
    <div className="container mt-12 mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary text-center mb-4">
        Reservas de Churrasqueiras
      </h1>
      <p className="mt-3 text-base sm:text-lg text-muted-foreground text-center mb-12">
        Planeje seu churrasco conosco! Reserve uma churrasqueira e aproveite um
        dia especial com família e amigos em meio à natureza.
      </p>

      <Tabs value={etapa} className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="data" className="text-xs sm:text-sm p-2 sm:p-3">
            <span className="hidden sm:inline">Escolha a Data</span>
            <span className="sm:hidden">Data</span>
          </TabsTrigger>
          <TabsTrigger
            value="churrasqueira"
            disabled={!date}
            className="text-xs sm:text-sm p-2 sm:p-3"
          >
            <span className="hidden sm:inline">Escolha a Churrasqueira</span>
            <span className="sm:hidden">Churrasqueira</span>
          </TabsTrigger>
          <TabsTrigger
            value="formulario"
            disabled={!churrasqueiraSelecionada}
            className="text-xs sm:text-sm p-2 sm:p-3"
          >
            <span className="hidden sm:inline">Dados Pessoais</span>
            <span className="sm:hidden">Dados</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="py-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Selecione a Data da Reserva
              </CardTitle>
              <CardDescription className="text-base">
                Escolha o dia em que deseja fazer sua churrasqueira
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelectDate}
                className="rounded-md border"
                disabled={(date) =>
                  date < new Date() ||
                  date >
                    new Date(new Date().setMonth(new Date().getMonth() + 3))
                }
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                disabled={!date}
                onClick={() => setEtapa("churrasqueira")}
              >
                Continuar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="churrasqueira" className="py-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Escolha sua Churrasqueira
              </CardTitle>
              <CardDescription className="text-base">
                Churrasqueiras disponíveis para {formatarData(date)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2">
                    Carregando churrasqueiras disponíveis...
                  </span>
                </div>
              ) : churrasqueirasDisponiveis.length === 0 ? (
                <Alert>
                  <AlertTitle>Nenhuma churrasqueira disponível</AlertTitle>
                  <AlertDescription>
                    Não há churrasqueiras disponíveis para a data{" "}
                    {formatarData(date)}. Por favor, escolha outra data.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {churrasqueirasDisponiveis.map((churrasqueira) => (
                    <Card
                      key={churrasqueira.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        churrasqueiraSelecionada?.id === churrasqueira.id
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => handleSelectChurrasqueira(churrasqueira)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {churrasqueira.nome}
                        </CardTitle>
                        <CardDescription className="text-base">
                          Capacidade: {churrasqueira.capacidade} pessoas
                        </CardDescription>
                        {churrasqueira.descricao && (
                          <p className="text-sm text-gray-600">
                            {churrasqueira.descricao}
                          </p>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              R$ {churrasqueira.preco.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">por dia</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={voltarParaData}>
                Voltar
              </Button>
              <Button
                disabled={!churrasqueiraSelecionada}
                onClick={() => setEtapa("formulario")}
              >
                Continuar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="formulario" className="py-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Complete seus dados</CardTitle>
              <CardDescription className="text-base">
                Preencha as informações para finalizar sua reserva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-base">
                      Nome completo *
                    </Label>
                    <Input
                      id="nome"
                      name="nome"
                      placeholder="Digite seu nome completo"
                      required
                      value={formData.nome}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pessoas" className="text-base">
                      Número de pessoas *
                    </Label>
                    <Input
                      id="pessoas"
                      name="pessoas"
                      type="number"
                      min="1"
                      max={churrasqueiraSelecionada?.capacidade}
                      placeholder="Ex: 8"
                      required
                      value={formData.pessoas}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-base">
                      CPF *
                    </Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-base">
                      Telefone *
                    </Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      placeholder="(00) 00000-0000"
                      required
                      value={formData.telefone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="seu@email.com"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes" className="text-base">
                    Observações (opcional)
                  </Label>
                  <Input
                    id="observacoes"
                    name="observacoes"
                    placeholder="Informações adicionais..."
                    value={formData.observacoes}
                    onChange={handleInputChange}
                  />
                </div>

                <Separator className="my-4" />

                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="font-medium text-base mb-2">
                    Resumo da reserva:
                  </h3>
                  <p className="text-base">
                    <strong>Data:</strong> {formatarData(date)}
                  </p>
                  <p className="text-base">
                    <strong>Churrasqueira:</strong>{" "}
                    {churrasqueiraSelecionada?.nome}
                  </p>
                  <p className="text-base">
                    <strong>Capacidade:</strong>{" "}
                    {churrasqueiraSelecionada?.capacidade} pessoas
                  </p>
                  <p className="text-base">
                    <strong>Valor:</strong> R${" "}
                    {churrasqueiraSelecionada?.preco?.toFixed(2)}
                  </p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={voltarParaChurrasqueira}>
                Voltar
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processando...</span>
                  </div>
                ) : (
                  "Finalizar Reserva"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="confirmacao" className="py-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Reserva Realizada com Sucesso!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="bg-green-50 border-green-200">
                <AlertTitle className="text-green-800 text-base">
                  Confirmação de Reserva
                </AlertTitle>
                <AlertDescription className="text-green-700 text-base">
                  <p>Sua reserva foi confirmada com sucesso!</p>
                </AlertDescription>
              </Alert>

              <div className="mt-6 bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium text-base mb-2">
                  Detalhes da reserva:
                </h3>
                <p className="text-base">
                  <strong>Nome:</strong> {formData.nome}
                </p>
                <p className="text-base">
                  <strong>Data:</strong> {formatarData(date)}
                </p>
                <p className="text-base">
                  <strong>Churrasqueira:</strong>{" "}
                  {churrasqueiraSelecionada?.nome}
                </p>
                <p className="text-base">
                  <strong>Pessoas:</strong> {formData.pessoas}
                </p>
                <p className="text-base">
                  <strong>Valor:</strong> R${" "}
                  {churrasqueiraSelecionada?.preco?.toFixed(2)}
                </p>
                <p className="mt-4 text-sm">
                  Um comprovante foi enviado para {formData.email}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={novaReserva}>Fazer nova reserva</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reservas;
