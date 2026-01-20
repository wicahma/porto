import { getUserAction, signInAction } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  LoginFormState,
  UseLoginFormReturn,
} from "@/interface/pages/login-form.interface";

export const useLoginFormHooks = (): UseLoginFormReturn => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const result = await getUserAction();
      if (result.success && result.data) {
        router.replace("/admin/dashboard");
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signInAction(email, password);

      if (!result.success) {
        setError(result.error || "Failed to sign in");
        toast.error(result.error || "Failed to sign in");
        return;
      }

      toast.success("Signed in successfully!");
      router.push("/admin/dashboard");
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
      email,
      password,
      loading,
      error,
    },
    setEmail,
    setPassword,
    handleSubmit,
  };
};
