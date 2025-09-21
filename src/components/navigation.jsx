"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "Valores", href: "/valores" },
    { name: "Galeria", href: "/galeria" },
    { name: "Contato", href: "/contato" }
  ];

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Listen for navigation events from other components
  useEffect(() => {
    const handleCloseNavigation = () => {
      closeMobileMenu();
    };

    // Add event listener
    window.addEventListener("closeNavigation", handleCloseNavigation);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener("closeNavigation", handleCloseNavigation);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeMobileMenu}>
              <h1 className="text-xl font-bold text-primary">Águas Claras</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/reservas" onClick={closeMobileMenu}>
              <Button className="bg-primary hover:bg-primary/90">
                Reserve sua churrasqueira
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/reservas" className="w-full">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={closeMobileMenu}
                  >
                    Reserve sua churrasqueira
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
