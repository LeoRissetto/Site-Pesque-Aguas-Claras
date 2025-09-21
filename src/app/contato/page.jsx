"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { mensagensApi } from "@/lib/api";

export default function Contato() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telefone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await mensagensApi.create({
        nome: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        telefone: formData.telefone,
        assunto: "Contato via site",
        mensagem: formData.message
      });

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        telefone: "",
        message: ""
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };
  return (
    <section className="min-h-screen w-full max-w-5xl mx-auto px-6 py-16 mt-3">
      <div className="w-full max-w-1xl mx-auto px-6 xl:px-0">
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-primary text-center">
          Fale com nossa equipe!
        </h1>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground text-center">
          Estamos prontos para te ajudar. Preencha o formulário ou utilize um
          dos canais abaixo.
        </p>
        {/* Cards de contato em cima */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center p-6">
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                <MailIcon />
              </div>
              <h3 className="font-semibold text-xl mb-2">E-mail</h3>
              <p className="text-muted-foreground text-center mb-2">
                Nossa equipe está pronta para ajudar.
              </p>
              <Link
                className="font-medium text-primary"
                href="mailto:contato@aguasclaras.com.br"
              >
                contato@aguasclaras.com.br
              </Link>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center p-6">
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                <MessageCircle />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-center">
                Horário de Atendimento
              </h3>
              <p className="text-muted-foreground text-center mb-2">
                Segunda a domingo das 6h às 18h. Funcionamento normal em
                feriados
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center p-6">
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                <MapPinIcon />
              </div>
              <h3 className="font-semibold text-xl mb-2">Endereço</h3>
              <p className="text-muted-foreground text-center mb-2">
                Venha nos visitar!
              </p>
              <Link
                className="font-medium text-primary"
                href="https://maps.google.com"
                target="_blank"
              >
                Estrada da Marcelinha, 3800
                <br />
                Campina Grande do Sul - PR
              </Link>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center p-6">
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                <PhoneIcon />
              </div>
              <h3 className="font-semibold text-xl mb-2">Telefone</h3>
              <p className="text-muted-foreground text-center mb-2">
                Seg a Sex das 8h às 18h.
              </p>
              <Link
                className="font-medium text-primary"
                href="tel:+5511999999999"
              >
                (41) 3873-1063
              </Link>
            </CardContent>
          </Card>
        </div>
        {/* Formulário embaixo */}
        <Card className="bg-accent shadow-none py-0 mt-12">
          <CardContent className="p-6 md:p-8">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Mensagem enviada com sucesso!
                </h3>
                <p className="text-gray-600 mb-6">
                  Obrigado pelo seu contato. Nossa equipe responderá em breve.
                </p>
                <Button
                  onClick={() => setSuccess(false)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Enviar nova mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">Nome</Label>
                    <Input
                      placeholder="Seu nome"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange("firstName")}
                      className="mt-2 bg-white h-10 shadow-none"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input
                      placeholder="Seu sobrenome"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange("lastName")}
                      className="mt-2 bg-white h-10 shadow-none"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      type="email"
                      placeholder="Seu e-mail"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      className="mt-2 bg-white h-10 shadow-none"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      type="tel"
                      placeholder="Seu telefone"
                      id="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange("telefone")}
                      className="mt-2 bg-white h-10 shadow-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua mensagem"
                    value={formData.message}
                    onChange={handleInputChange("message")}
                    className="mt-2 bg-white shadow-none"
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
