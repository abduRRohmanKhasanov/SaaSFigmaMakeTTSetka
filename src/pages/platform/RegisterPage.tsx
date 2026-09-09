import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError(true); return; }
    navigate("/platform/new");
  };

  return (
    <div className="min-h-full flex flex-col max-w-[480px] mx-auto bg-surface">
      <header className="flex items-center h-16 px-2 border-b border-outline-variant">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8">
          <ArrowLeft size={24} />
        </button>
        <span className="title-large text-on-surface px-2">Регистрация</span>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 flex-1">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          supportingText="Будет использоваться для входа"
          error={error && !email}
          errorText="Введите email"
        />
        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          supportingText="Минимум 8 символов"
          error={error && !password}
          errorText="Введите пароль"
        />
        <Button variant="filled" type="submit" className="mt-2">Создать аккаунт</Button>
        <Button variant="text" type="button" onClick={() => navigate("/login")}>
          Уже есть аккаунт? Войти
        </Button>
      </form>
    </div>
  );
}
