import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer id="contato" className="bg-muted py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-4">
              Pesque Pague Águas Claras
            </h3>
            <p className="text-muted-foreground mb-4 text-pretty">
              Seu destino para momentos de lazer, pesca e diversão em família.
              Venha conhecer nossa estrutura completa em meio à natureza de
              Campina Grande do Sul.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm">(41) 3873-1063</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm">contato@aguasclaras.com.br</span>
              </div>
              <div className="flex items-start text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-sm">
                  Estrada da Marcelinha, 3800
                  <br />
                  Campina Grande do Sul - PR
                </span>
              </div>
            </div>
          </div>

          {/* Horário de Funcionamento */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Funcionamento
            </h4>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <div className="text-sm">
                  <p>Seg - Dom: 6h às 18h</p>
                  <p>Feriados - Funcionamento Normal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Pesque Pague Águas Claras. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
