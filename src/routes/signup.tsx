import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout, Field, GoogleBtn } from "@/components/auth-layout";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — Campus Connect" },
      { name: "description", content: "Join Campus Connect and start learning and building with fellow students." },
      { property: "og:title", content: "Sign up — Campus Connect" },
      { property: "og:description", content: "Create your Campus Connect account." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  return (
    <AuthLayout title="Press start to join." subtitle="Create your profile and meet your campus crew.">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); nav({ to: "/dashboard" }); }}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="first" label="First name" required autoComplete="given-name" />
          <Field id="last" label="Last name" required autoComplete="family-name" />
        </div>
        <Field id="email" label="University email" type="email" placeholder="you@university.edu" required />
        <div>
          <label htmlFor="major" className="mb-1.5 block text-sm font-semibold">Major</label>
          <select id="major" className="pixel-input"><option>Computer Science</option><option>Mathematics</option><option>Physics</option><option>Chemistry</option><option>Literature</option></select>
        </div>
        <Field id="pw" label="Password" type="password" placeholder="At least 8 characters" minLength={8} required />
        <button type="submit" className="pixel-btn w-full bg-primary">Create account</button>
        <GoogleBtn />
      </form>
      <p className="mt-6 text-center text-sm">Already have an account? <Link to="/" className="font-semibold text-orange underline underline-offset-4">Log in</Link></p>
    </AuthLayout>
  );
}
