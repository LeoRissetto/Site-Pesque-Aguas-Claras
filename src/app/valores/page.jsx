import React from "react";

export const metadata = {
  title: "Valores | Águas Claras",
  description:
    "Conheça os valores de entrada, pescaria, comidas e bebidas do nosso pesqueiro.",
};

export default function ValoresPage() {
  return (
    <main className="container mx-auto px-4 py-20 max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary text-center mb-12 mt-8">
        Valores
      </h1>

      {/* Entrada */}
      <section className="mb-16">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
          <div className="bg-primary text-primary-foreground py-2 px-6">
            <h2 className="text-2xl font-semibold">Valor da Entrada</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                R$15,00 por pessoa
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Crianças de 0 a 5 anos não pagam entrada
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Não cobramos nenhum valor adicional pelo uso das piscinas
              </li>
            </ul>
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
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2">Serviço</th>
                    <th className="py-2 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3">Pesca por kg (Tilápia)</td>
                    <td className="py-3 text-right font-medium">R$20,00/kg</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3">Pesca por kg (Outras espécies)</td>
                    <td className="py-3 text-right font-medium">R$25,00/kg</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3">Pesca Livre</td>
                    <td className="py-3 text-right font-medium">R$80,00/dia</td>
                  </tr>
                  <tr>
                    <td className="py-3">Aluguel de vara de pesca</td>
                    <td className="py-3 text-right font-medium">R$10,00/dia</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Porções
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2">Porção de Filé de Tilápia 500g</td>
                        <td className="py-2 text-right font-medium">R$45,00</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">
                          Porção de Bolinho de Tilápia 10 UN.
                        </td>
                        <td className="py-2 text-right font-medium">R$30,00</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">
                          Porção de Alcatra acebolada 400g
                        </td>
                        <td className="py-2 text-right font-medium">R$45,00</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">
                          Porção de Frango a Passarinho 500g
                        </td>
                        <td className="py-2 text-right font-medium">R$30,00</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">Porção de Calabresa 400g</td>
                        <td className="py-2 text-right font-medium">R$30,00</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">Porção de Batata Frita 500g</td>
                        <td className="py-2 text-right font-medium">R$30,00</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">Porção de Polenta 500g</td>
                        <td className="py-2 text-right font-medium">R$30,00</td>
                      </tr>
                      <tr>
                        <td className="py-2">Mandioca 500g</td>
                        <td className="py-2 text-right font-medium">R$30,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  Acompanhamentos
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2">Porção de Arroz</td>
                        <td className="py-2 text-right font-medium">R$10,00</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">Porção de Feijão</td>
                        <td className="py-2 text-right font-medium">R$10,00</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">Porção de Macarrão</td>
                        <td className="py-2 text-right font-medium">R$10,00</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">
                          Porção de Salada (Alface e tomate)
                        </td>
                        <td className="py-2 text-right font-medium">R$10,00</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">
                          Porção de Maionese Caseira 500g
                        </td>
                        <td className="py-2 text-right font-medium">R$15,00</td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          Almoço com acompanhamentos (serve 2 pessoas) – Filé de
                          Tilápia ou Alcatra
                        </td>
                        <td className="py-2 text-right font-medium">R$90,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Salgados
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody>
                    <tr>
                      <td className="py-2">
                        Salgados (Coxinha, Risóles, Enroladinho de Salsicha e
                        Bolinho de Peixe)
                      </td>
                      <td className="py-2 text-right font-medium">R$6,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2">Água mineral (com e sem gás)</td>
                    <td className="py-2 text-right font-medium">R$4,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Refrigerante 350ml</td>
                    <td className="py-2 text-right font-medium">R$7,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Refrigerante 600ml</td>
                    <td className="py-2 text-right font-medium">R$8,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Refrigerante Coca-Cola 2L</td>
                    <td className="py-2 text-right font-medium">R$17,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Refrigerante 2L (Outros)</td>
                    <td className="py-2 text-right font-medium">R$15,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Suco Del Vale</td>
                    <td className="py-2 text-right font-medium">R$7,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Energético Monster</td>
                    <td className="py-2 text-right font-medium">R$15,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Café 190ml</td>
                    <td className="py-2 text-right font-medium">R$4,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Cerveja Kaiser 600ml</td>
                    <td className="py-2 text-right font-medium">R$12,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">Cerveja 600ml (Outras)</td>
                    <td className="py-2 text-right font-medium">R$14,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">
                      Cerveja lata 350ml (Amstel/Brahma/Kaiser)
                    </td>
                    <td className="py-2 text-right font-medium">R$7,00</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2">
                      Caipirinha de limão c/ cachaça ou Askov 500ml
                    </td>
                    <td className="py-2 text-right font-medium">R$20,00</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      Caipirinha de limão c/ Bacardi ou Smirnoff 500ml
                    </td>
                    <td className="py-2 text-right font-medium">R$25,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
