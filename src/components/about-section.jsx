import { Card, CardContent } from "@/components/ui/card";
import {
  Fish,
  Users,
  TreePine,
  Utensils,
  WavesLadder,
  Shapes
} from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: Fish,
      title: "Pescaria",
      description:
        "Desfrute de uma experiência única de pesca em nossas águas cristalinas, repletas de peixes variados."
    },
    {
      icon: Users,
      title: "Ambiente Familiar",
      description:
        "Um espaço seguro e acolhedor para toda a família se divertir e criar memórias inesquecíveis."
    },
    {
      icon: TreePine,
      title: "Natureza Preservada",
      description:
        "Localizado em meio à natureza exuberante de Campina Grande do Sul, oferecendo paz e tranquilidade."
    },
    {
      icon: Utensils,
      title: "Churrasqueiras",
      description:
        "Churrasqueiras equipadas para você preparar suas refeições em um ambiente natural privilegiado."
    },
    {
      icon: WavesLadder,
      title: "Piscinas",
      description:
        "Refresque-se e aproveite momentos de lazer em nossas piscinas, com tamanhos para todas as idades."
    },
    {
      icon: Shapes,
      title: "Playground",
      description:
        "Espaço dedicado para as crianças brincarem com segurança e alegria."
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nossos Atrativos
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Descubra os principais atrativos do Pesque Pague Águas Claras e viva
            momentos inesquecíveis em meio à natureza. Oferecemos pesca
            esportiva, ambiente familiar, áreas preservadas, piscina, playground
            e churrasqueiras para garantir lazer, diversão e conforto para todos
            os visitantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm text-pretty">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
