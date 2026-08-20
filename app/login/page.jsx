"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { setUser } from "@/store/userSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (result?.error) {
      setLoading(false);
      setError("Invalid email or password");
      return;
    }

    // Pull the freshly minted session and hydrate Redux before navigating.
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    if (session?.user) {
      dispatch(
        setUser({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
        })
      );
    }

    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <main className="auth-screen">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Sign in</p>
        <h1>Welcome back</h1>

        {error && <p className="form-error">{error}</p>}

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? "Signing in..." : "Log in"}
        </button>

        <p className="auth-switch">
          No account? <Link href="/register">Register</Link>
        </p>
      </form>
    </main>
  );
}
