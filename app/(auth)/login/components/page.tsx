import Link from "next/link";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-alt px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-lg">
        <header className="mb-7 border-b border-border pb-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Todo App</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">Login</h1>
          <p className="mt-2 text-sm text-muted">Masuk untuk mengelola daftar tugas Anda.</p>
        </header>
        <LoginForm />
        <Link href="/" className="mt-6 block text-center text-sm text-muted hover:text-accent">Kembali ke beranda</Link>
      </div>
    </main>
  );
}