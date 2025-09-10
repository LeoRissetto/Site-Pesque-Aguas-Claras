"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Dados mockados de churrasqueiras (em produção, viriam do backend)
const churrasqueirasDisponiveis = [
  {
    id: 1,
    nome: "Churrasqueira 1",
    capacidade: "10 pessoas",
    valor: 150,
  },
  {
    id: 2,
    nome: "Churrasqueira 2",
    capacidade: "15 pessoas",
    valor: 200,
  },
  {
    id: 3,
    nome: "Churrasqueira 3",
    capacidade: "8 pessoas",
    valor: 120,
  },
  {
    id: 4,
    nome: "Churrasqueira 4",
    capacidade: "20 pessoas",
    valor: 250,
  },
];

const Reservas = () => {
  const [date, setDate] = useState(null);
  const [etapa, setEtapa] = useState("data"); // "data", "churrasqueira", "formulario", "confirmacao"
  const [churrasqueiraSelecionada, setChurrasqueiraSelecionada] =
    useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
  });
  const [reservaCompleta, setReservaCompleta] = useState(false);

  const handleSelectDate = (selectedDate) => {
    setDate(selectedDate);
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
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui seria feita a integração com o backend
    console.log("Dados da reserva:", {
      date,
      churrasqueiraSelecionada,
      formData,
    });
    setReservaCompleta(true);
    setEtapa("confirmacao");
  };

  const voltarParaData = () => {
    setEtapa("data");
    setChurrasqueiraSelecionada(null);
  };

  const voltarParaChurrasqueira = () => {
    setEtapa("churrasqueira");
  };

  const formatarData = (data) => {
    if (!data) return "";
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
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
    });
    setReservaCompleta(false);
    setEtapa("data");
  };

  return (
    <div className="container mt-12 mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary text-center mb-12">
        Reservas de Churrasqueiras
      </h1>

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {churrasqueirasDisponiveis.map((churrasqueira) => (
                  <Card
                    key={churrasqueira.id}
                    className={`cursor-pointer transition-all ${
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
                        Capacidade: {churrasqueira.capacidade}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-right">
                          <p className="font-bold text-base">
                            R$ {churrasqueira.valor.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">por dia</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-base">
                    Nome completo
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
                  <Label htmlFor="cpf" className="text-base">
                    CPF
                  </Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    required
                    value={formData.cpf}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-base">
                    Telefone
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

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    E-mail
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
                    {churrasqueiraSelecionada?.capacidade}
                  </p>
                  <p className="text-base">
                    <strong>Valor:</strong> R${" "}
                    {churrasqueiraSelecionada?.valor.toFixed(2)}
                  </p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={voltarParaChurrasqueira}>
                Voltar
              </Button>
              <Button onClick={handleSubmit}>Finalizar Reserva</Button>
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
                  <strong>Valor:</strong> R${" "}
                  {churrasqueiraSelecionada?.valor.toFixed(2)}
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
