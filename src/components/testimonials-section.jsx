import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Karoline Gaspareto Andrade",
      location: "5 meses atrás",
      text: "Excelente ambiente familiar. Abre todos os dias do ano. R$15 por pessoa, livre churrasqueira e piscina familiar. Tem opção de camping também.",
      rating: 5
    },
    {
      name: "Abreu Junior",
      location: "3 anos atrás",
      text: "Excelente atendimento, estrutura incrível e preços super acessíveis. Uma experiência única para quem busca diversão em família. Parabéns a toda equipe, especialmente aos que trabalham com peixe.",
      rating: 5
    },
    {
      name: "José Luiz Veríssimo de Mattos",
      location: "11 meses atrás",
      text: "Local muito bonito, bem tratado e com preços excelentes. Vários quiosques com pia, churrasqueira e mesa, tudo gratuito. Parabéns aos donos e colaboradores por oferecer lazer acessível para todos.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            O que nossos visitantes dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Confira os depoimentos de quem já viveu momentos especiais no Águas
            Claras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
