import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export const metadata = {
  title: "Valores | Águas Claras",
  description:
    "Conheça os valores de entrada, pescaria, comidas e bebidas do nosso pesqueiro."
};

export default function ValoresPage() {
  return (
    <main className="container mx-auto px-4 py-20 max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary text-center mb-4 mt-3">
        Valores
      </h1>
      <p className="mt-3 text-base sm:text-lg text-muted-foreground text-center mb-12">
        Confira nossos preços acessíveis para toda a família, com opções para
        todos os gostos e bolsos.
      </p>

      {/* Entrada */}
      <section className="mb-16">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="bg-primary text-primary-foreground py-2 px-6">
            <h2 className="text-2xl font-semibold">Valor da Entrada</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Adultos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">R$15,00</p>
                  <CardDescription>por pessoa</CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Crianças</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">Grátis</p>
                  <CardDescription>
                    0 a 5 anos não pagam entrada
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Piscinas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">Incluídas</p>
                  <CardDescription>Sem valor adicional</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pescaria */}
      <section className="mb-16">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="bg-primary text-primary-foreground py-2 px-6">
            <h2 className="text-2xl font-semibold">Pescaria</h2>
          </div>
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serviço</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Pesca por kg (Tilápia)</TableCell>
                  <TableCell className="text-right font-medium">
                    R$20,00/kg
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pesca por kg (Outras espécies)</TableCell>
                  <TableCell className="text-right font-medium">
                    R$25,00/kg
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pesca Livre</TableCell>
                  <TableCell className="text-right font-medium">
                    R$80,00/dia
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Aluguel de vara de pesca</TableCell>
                  <TableCell className="text-right font-medium">
                    R$10,00/dia
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Comidas */}
      <section className="mb-16">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="bg-primary text-primary-foreground py-2 px-6">
            <h2 className="text-2xl font-semibold">Comidas</h2>
          </div>
          <div className="p-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Porções
              </h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Porção de Filé de Tilápia 500g</TableCell>
                    <TableCell className="text-right font-medium">
                      R$45,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção de Bolinho de Tilápia 10 UN.</TableCell>
                    <TableCell className="text-right font-medium">
                      R$30,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção de Alcatra acebolada 400g</TableCell>
                    <TableCell className="text-right font-medium">
                      R$45,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção de Frango a Passarinho 500g</TableCell>
                    <TableCell className="text-right font-medium">
                      R$30,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção de Calabresa 400g</TableCell>
                    <TableCell className="text-right font-medium">
                      R$30,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção de Batata Frita 500g</TableCell>
                    <TableCell className="text-right font-medium">
                      R$30,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção de Polenta 500g</TableCell>
                    <TableCell className="text-right font-medium">
                      R$30,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção Mandioca 500g</TableCell>
                    <TableCell className="text-right font-medium">
                      R$30,00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Acompanhamentos
              </h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Porção de Arroz</TableCell>
                    <TableCell className="text-right font-medium">
                      R$10,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção de Feijão</TableCell>
                    <TableCell className="text-right font-medium">
                      R$10,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção de Macarrão</TableCell>
                    <TableCell className="text-right font-medium">
                      R$10,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção de Salada (Alface e tomate)</TableCell>
                    <TableCell className="text-right font-medium">
                      R$10,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Porção de Maionese Caseira 500g</TableCell>
                    <TableCell className="text-right font-medium">
                      R$15,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Almoço com acompanhamentos (serve 2 pessoas) – Filé de
                      Tilápia ou Alcatra
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      R$90,00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Salgados
              </h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      Salgados (Coxinha, Risóles, Enroladinho de Salsicha e
                      Bolinho de Peixe)
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      R$6,00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Almoço
              </h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Prato feito - Filé de Tilápia</TableCell>
                    <TableCell className="text-right font-medium">
                      R$35,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Prato feito - Carne bovina (Alcatra)</TableCell>
                    <TableCell className="text-right font-medium">
                      R$35,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Prato feito - Frango grelhado</TableCell>
                    <TableCell className="text-right font-medium">
                      R$30,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marmitex pequena</TableCell>
                    <TableCell className="text-right font-medium">
                      R$25,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marmitex grande</TableCell>
                    <TableCell className="text-right font-medium">
                      R$30,00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Prato infantil</TableCell>
                    <TableCell className="text-right font-medium">
                      R$20,00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-sm text-muted-foreground mt-2">
                * Todos os pratos são acompanhados de arroz, feijão, salada e
                uma guarnição (batata frita, mandioca ou polenta).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bebidas */}
      <section className="mb-16">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="bg-primary text-primary-foreground py-2 px-6">
            <h2 className="text-2xl font-semibold">Bebidas</h2>
          </div>
          <div className="p-6">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Água mineral (com e sem gás)</TableCell>
                  <TableCell className="text-right font-medium">
                    R$4,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Refrigerante 350ml</TableCell>
                  <TableCell className="text-right font-medium">
                    R$7,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Refrigerante 600ml</TableCell>
                  <TableCell className="text-right font-medium">
                    R$8,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Refrigerante Coca-Cola 2L</TableCell>
                  <TableCell className="text-right font-medium">
                    R$17,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Refrigerante 2L (Outros)</TableCell>
                  <TableCell className="text-right font-medium">
                    R$15,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Suco Del Vale</TableCell>
                  <TableCell className="text-right font-medium">
                    R$7,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Energético Monster</TableCell>
                  <TableCell className="text-right font-medium">
                    R$15,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Café 190ml</TableCell>
                  <TableCell className="text-right font-medium">
                    R$4,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cerveja Kaiser 600ml</TableCell>
                  <TableCell className="text-right font-medium">
                    R$12,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cerveja 600ml (Outras)</TableCell>
                  <TableCell className="text-right font-medium">
                    R$14,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Cerveja lata 350ml (Amstel/Brahma/Kaiser)
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$7,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Caipirinha de limão c/ cachaça ou Askov 500ml
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$20,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Caipirinha de limão c/ Bacardi ou Smirnoff 500ml
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$25,00
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Preços sujeitos a alterações sem aviso prévio.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Para mais informações, entre em contato conosco.
        </p>
      </div>
    </main>
  );
}
