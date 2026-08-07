import { useState } from "react";
import toast from "react-hot-toast";
import { UseLoginFormReturn } from "@/interface/pages/login-form.interface";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const useLoginFormHooks = (): UseLoginFormReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGithubSignIn = async (_captchaToken?: string) => {
    setError("");
    setLoading(true);

    try {
      // Redirect to Go backend GitHub OAuth
      window.location.href = `${API_BASE_URL}/api/auth/github/login`;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      loading,
      error,
    },
    handleGithubSignIn,
  };
};
