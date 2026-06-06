import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const AuthFloatingButton = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Você saiu da sua conta.");
    navigate("/");
  };

  const baseClass =
    "fixed top-5 right-5 sm:top-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const baseStyle = {
    background: "linear-gradient(135deg, hsl(0 0% 18%) 0%, hsl(0 0% 8%) 100%)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.45), 0 0 18px rgba(212,175,55,0.18)",
    border: "1px solid rgba(212,175,55,0.45)",
  } as const;

  if (!email) {
    return (
      <Link
        to="/auth"
        aria-label="Entrar ou criar conta"
        className={baseClass}
        style={baseStyle}
      >
        <User className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Menu da conta"
        className={baseClass}
        style={baseStyle}
      >
        <User className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2 mr-1">
        <DropdownMenuLabel className="truncate text-xs font-normal text-muted-foreground">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
