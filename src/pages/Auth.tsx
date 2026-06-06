import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = mode === "login" ? "Entrar | 3R Fitness" : "Criar conta | 3R Fitness";
  }, [mode]);

  // Se já estiver logado, redireciona pra home
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/", { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { display_name: name },
          },
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu e-mail para confirmar.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
        navigate("/");
      }
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.toLowerCase().includes("invalid login")) {
        toast.error("E-mail ou senha inválidos.");
      } else if (msg.toLowerCase().includes("already registered") || msg.toLowerCase().includes("already exists")) {
        toast.error("Este e-mail já está cadastrado. Faça login.");
      } else {
        toast.error(msg || "Algo deu errado.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("Erro ao entrar com Google.");
        setLoading(false);
        return;
      }
      if (result.redirected) return;
      navigate("/");
    } catch {
      toast.error("Erro ao entrar com Google.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <Link
        to="/"
        className="absolute top-5 left-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div
        className="w-full max-w-md p-8 rounded-lg border"
        style={{
          background: "linear-gradient(180deg, hsl(0 0% 6%) 0%, hsl(0 0% 4%) 100%)",
          borderColor: "hsl(42 50% 35% / 0.4)",
          boxShadow: "0 20px 50px hsl(0 0% 0% / 0.5), 0 0 30px hsl(42 70% 50% / 0.08)",
        }}
      >
        <h1
          className="text-center text-2xl font-display font-medium mb-1"
          style={{
            background: "linear-gradient(180deg, #f4d77a 0%, #d4af37 50%, #b8860b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h1>
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          3R Fitness
        </p>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogle}
          disabled={loading}
          className="w-full mb-4 bg-white text-black hover:bg-white/90 border-white"
        >
          <svg className="h-4 w-4 mr-2" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41 35 44 29.9 44 24c0-1.3-.1-2.4-.4-3.5z"/>
          </svg>
          Continuar com Google
        </Button>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">ou</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome"
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="voce@exemplo.com"
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={{
              background: "linear-gradient(110deg, #b8860b 0%, #d4af37 50%, #b8860b 100%)",
              color: "#000",
            }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "login" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === "login" ? "Ainda não tem conta?" : "Já tem conta?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="font-medium underline-offset-4 hover:underline"
            style={{ color: "#d4af37" }}
          >
            {mode === "login" ? "Criar conta" : "Entrar"}
          </button>
        </p>
      </div>
    </main>
  );
};

export default Auth;
