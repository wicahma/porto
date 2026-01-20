"use client";

import { getUserAction, signInAction } from "@/actions/auth.actions";
import { Alert, AlertDescription } from "@/components/atoms/popups/alert";
import { Button } from "@/components/atoms/buttons/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/cards/card";
import { Input } from "@/components/atoms/inputs/input";
import { Label } from "@/components/atoms/inputs/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminContainer from "./wrapper/AdminContainer";

const LoginPage = () => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4">
      <Card className="w-full max-w-md border-neutral-800 bg-neutral-900/50 backdrop-blur">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            Admin Login
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-950/50 border-red-900"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
