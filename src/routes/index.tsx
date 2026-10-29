import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout, Field, GoogleBtn } from "@/components/auth-layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Log in — Campus Connect" },
      { name: "description", content: "Log in to Campus Connect to ask questions, share knowledge and find teammates." },
      { property: "og:title", content: "Log in — Campus Connect" },
      { property: "og:description", content: "Student community for questions, answers and project teams." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  return (
    <AuthLayout title="Welcome back, player." subtitle="Log in to continue your campus quest.">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); nav({ to: "/dashboard" }); }}>
        <Field id="email" label="University email" type="email" placeholder="you@university.edu" required autoComplete="email" />
        <Field id="pw" label="Password" type="password" placeholder="••••••••" required autoComplete="current-password" />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-[var(--orange)]" />Remember me</label>
          <a href="#" className="font-medium underline underline-offset-4">Forgot password?</a>
        </div>
        <button type="submit" className="pixel-btn w-full bg-primary">Log in</button>
        <div className="label-pixel text-center text-muted-foreground">or</div>
        <GoogleBtn />
      </form>
      <p className="mt-6 text-center text-sm">New here? <Link to="/signup" className="font-semibold text-orange underline underline-offset-4">Create an account</Link></p>
    </AuthLayout>
  );
}
