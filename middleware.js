import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Middleware adicional se necessário
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acesso às rotas admin apenas para usuários autenticados
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }
        return true;
      }
    }
  }
);

export const config = {
  matcher: ["/admin/:path*"]
};
