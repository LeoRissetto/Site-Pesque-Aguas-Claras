"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Galeria() {
  const images = [
    { src: "/images/fotoaerea.jpg", category: "local" },
    { src: "/images/local.jpg", category: "local" },
    { src: "/images/churrasqueiras1.jpg", category: "churrasqueiras" },
    { src: "/images/churrasqueiras3.jpg", category: "churrasqueiras" },
    { src: "/images/churrasqueiras4.jpg", category: "churrasqueiras" },
    { src: "/images/churrasqueiras5.jpg", category: "churrasqueiras" },
    { src: "/images/pesca1.jpg", category: "pesca" },
    { src: "/images/pesca2.jpg", category: "pesca" },
    { src: "/images/pesca3.jpg", category: "pesca" },
    { src: "/images/piscina.jpg", category: "piscina" },
    { src: "/images/piscina2.jpg", category: "piscina" },
    { src: "/images/piscina3.jpg", category: "piscina" },
    { src: "/images/playground.jpg", category: "playground" },
    { src: "/images/playground2.jpg", category: "playground" },
    { src: "/images/prato1.jpg", category: "gastronomia" },
    { src: "/images/prato2.jpg", category: "gastronomia" },
    { src: "/images/prato3.jpg", category: "gastronomia" },
    { src: "/images/prato4.jpg", category: "gastronomia" }
  ];

  // Extrai categorias únicas
  const categories = [
    "todas",
    ...Array.from(new Set(images.map((img) => img.category)))
  ];

  const [selectedCategory, setSelectedCategory] = useState("todas");

  // Filtra imagens pela categoria selecionada
  const filteredImages =
    selectedCategory === "todas"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="mt-15 py-8 bg-gradient-to-r from-primary to-muted-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Galeria de Fotos
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Conheça nosso espaço e veja por que somos o destino favorito das
              famílias em Campina Grande do Sul
            </p>
          </div>
        </div>
      </section>

      {/* Filtro de categorias */}
      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="capitalize"
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-square hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
