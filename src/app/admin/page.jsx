"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import {
  FiGrid,
  FiMessageSquare,
  FiCalendar,
  FiLogOut,
  FiUsers,
  FiDollarSign,
  FiActivity
} from "react-icons/fi";
import Link from "next/link";
import { statsApi } from "@/lib/api";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    churrasqueiras: 0,
    mensagens: 0,
    reservas: 0,
    mensagensNaoLidas: 0
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    // Carregar estatísticas
    const fetchStats = async () => {
      try {
        const data = await statsApi.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
        // Manter valores padrão em caso de erro
        setStats({
          churrasqueiras: 0,
          mensagens: 0,
          reservas: 0,
          mensagensNaoLidas: 0
        });
      }
    };

    if (session) {
      fetchStats();
    }
  }, [session]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <section className="min-h-screen w-full max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary">
              Painel Administrativo
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              Pesque Pague Águas Claras - Gestão Completa
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Bem-vindo, {session.user.name}
            </span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <FiLogOut />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="shadow-sm border-l-4 border-l-primary">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Churrasqueiras
              </p>
              <p className="text-3xl font-bold text-primary">
                {stats.churrasqueiras}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <FiGrid className="w-6 h-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-accent">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Reservas
              </p>
              <p className="text-3xl font-bold text-accent-foreground">
                {stats.reservas}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-accent-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-secondary">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Mensagens
              </p>
              <p className="text-3xl font-bold text-secondary-foreground">
                {stats.mensagens}
              </p>
            </div>
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
              <FiMessageSquare className="w-6 h-6 text-secondary-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-destructive">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Não Lidas
              </p>
              <p className="text-3xl font-bold text-destructive">
                {stats.mensagensNaoLidas}
              </p>
            </div>
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiGrid className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Gerenciar Churrasqueiras
            </h3>
            <p className="text-muted-foreground mb-6">
              Adicione, edite ou remova churrasqueiras disponíveis
            </p>
            <Link href="/admin/churrasqueiras">
              <Button className="w-full">Acessar</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="text-center p-6">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Reservas</h3>
            <p className="text-muted-foreground mb-6">
              Visualize e gerencie todas as reservas
            </p>
            <Link href="/admin/reservas">
              <Button className="w-full">Acessar</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="text-center p-6">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMessageSquare className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mensagens</h3>
            <p className="text-muted-foreground mb-6">
              Veja mensagens de contato dos visitantes
            </p>
            <Link href="/admin/mensagens">
              <Button className="w-full">Acessar</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
