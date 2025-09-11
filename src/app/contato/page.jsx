import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from "lucide-react";
import Link from "next/link";

export default function Contato() {
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
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    placeholder="Seu nome"
                    id="firstName"
                    className="mt-2 bg-white h-10 shadow-none"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    placeholder="Seu sobrenome"
                    id="lastName"
                    className="mt-2 bg-white h-10 shadow-none"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  id="email"
                  className="mt-2 bg-white h-10 shadow-none"
                />
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Digite sua mensagem"
                  className="mt-2 bg-white shadow-none"
                  rows={5}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="acceptTerms" className="bg-background" />
                <Label htmlFor="acceptTerms" className="gap-0 text-sm">
                  Concordo com os
                  <Link href="#" className="underline ml-1 text-primary">
                    termos e condições
                  </Link>
                  .
                </Label>
              </div>
              <Button className="w-full mt-4" size="lg">
                Enviar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
