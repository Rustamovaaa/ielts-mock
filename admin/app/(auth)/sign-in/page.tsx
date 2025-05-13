"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Github, Loader2, Mail } from "lucide-react";

export default function SignInPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleProviderSignIn = async (provider: "google" | "github") => {
    setLoading(provider);
    await signIn(provider, { callbackUrl: "/dashboard" });
    setLoading(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
          Welcome Back
        </h2>
        <p className="mt-3 text-sm text-center text-gray-500">
          Sign in to access your admin dashboard
        </p>
      </div>
      <div className="space-y-4">
        <Button
          onClick={() => handleProviderSignIn("google")}
          className="w-full flex items-center justify-center gap-2"
          disabled={loading === "google"}
        >
          {loading === "google" ? <Loader2 className="animate-spin h-4 w-4" /> : <Mail className="h-4 w-4" />}
          Continue with Google
        </Button>
        <Button
          onClick={() => handleProviderSignIn("github")}
          className="w-full flex items-center justify-center gap-2"
          disabled={loading === "github"}
          variant="outline"
        >
          {loading === "github" ? <Loader2 className="animate-spin h-4 w-4" /> : <Github className="h-4 w-4" />}
          Continue with Github
        </Button>
      </div>
    </div>
  );
}