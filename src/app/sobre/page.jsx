import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPinIcon,
  Clock,
  UtensilsCrossed,
  CreditCardIcon
} from "lucide-react";

export default function Sobre() {
  return (
    <section className="min-h-screen w-full max-w-5xl mx-auto px-6 py-16 mt-8">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary text-center">
        Sobre o Pesque Pague Águas Claras
      </h1>
      <p className="mt-3 text-base sm:text-lg text-muted-foreground text-center mb-12">
        Seu destino perfeito para lazer, pesca e contato com a natureza em
        Campina Grande do Sul.
      </p>

      {/* Sobre Nós */}
      <Card className="mb-8 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Nossa Estrutura
          </h2>
          <p className="text-muted-foreground mb-6">
            Localizado em Campina Grande do Sul, o{" "}
            <span className="font-semibold text-primary">
              Pesque Pague Águas Claras
            </span>{" "}
            é o lugar ideal para quem busca lazer, diversão e contato com a
            natureza. Oferecemos uma estrutura completa para toda a família.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Piscinas com água natural (1 adulto e 2 infantis)</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Playground para as crianças</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Mais de 50 churrasqueiras cobertas</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>3 Tanques para pesca por kg</span>
              </li>
            </ul>

            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>1 Tanque para Pague e Pesque</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Lanchonete com diversos pratos e porções</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Rio cercando toda a propriedade</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Estacionamento amplo</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Informações Úteis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center p-6">
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              <Clock />
            </div>
            <h3 className="font-semibold text-xl mb-2">Funcionamento</h3>
            <p className="text-muted-foreground text-center">
              Segunda a domingo das 6h às 18h.
              <br />
              Funcionamento normal em feriados.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center p-6">
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              <MapPinIcon />
            </div>
            <h3 className="font-semibold text-xl mb-2">Localização</h3>
            <p className="text-muted-foreground text-center">
              Estrada da Marcelinha 3800
              <br />
              Campina Grande do Sul - PR
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center p-6">
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              <UtensilsCrossed />
            </div>
            <h3 className="font-semibold text-xl mb-2">Alimentação</h3>
            <p className="text-muted-foreground text-center">
              É permitido entrar com comidas e bebidas.
              <br />
              Nossa lanchonete serve almoço, porções e bebidas.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center p-6">
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              <CreditCardIcon />
            </div>
            <h3 className="font-semibold text-xl mb-2">Pagamentos</h3>
            <p className="text-muted-foreground text-center">
              Aceitamos dinheiro e cartão de débito.
              <br />
              Consulte opções de pagamento na entrada.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Aviso */}
      <Card className="mt-auto pt-8 bg-red-50 border border-red-200">
        <CardContent className="p-6 flex items-center justify-center">
          <p className="text-red-700 font-semibold text-center">
            ESTRITAMENTE PROIBIDO LIGAR SOM NO LOCAL
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
