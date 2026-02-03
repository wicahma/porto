import { signInWithGithubAction } from "@/actions/auth.actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { UseLoginFormReturn } from "@/interface/pages/login-form.interface";

export const useLoginFormHooks = (): UseLoginFormReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGithubSignIn = async (captchaToken?: string) => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithGithubAction(undefined, captchaToken);

      if (!result.success) {
        setError(result.error || "Failed to sign in with GitHub");
        toast.error(result.error || "Failed to sign in with GitHub");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      if (!message.startsWith("NEXT_REDIRECT")) {
        setError(message);
        toast.error(message);
      }
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
