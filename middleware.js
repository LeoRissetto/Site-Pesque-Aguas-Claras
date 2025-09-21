import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Log para debug em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.log("Middleware:", req.nextUrl.pathname);
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Sempre permitir acesso à página de login e APIs de auth
        if (pathname === "/admin/login" || pathname.startsWith("/api/auth")) {
          return true;
        }

        // Para rotas admin protegidas
        if (pathname.startsWith("/admin")) {
          return !!token && token.role === "admin";
        }

        // Permitir todas as outras rotas públicas
        return true;
      }
    }
  }
);

export const config = {
  matcher: [
    // Protege apenas as rotas admin (exceto login)
    "/admin/((?!login).*)",
    // Inclui a rota base /admin
    "/admin"
  ]
};
