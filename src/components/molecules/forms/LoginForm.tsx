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
import { UseLoginFormReturn } from "@/interface/pages/login-form.interface";
import React from "react";
import { handleTernary, RenderIf } from "@/utils/helper/render-if";
import { CaptchaProvider, useCaptcha } from "@/components/atoms/captcha";

interface LoginFormProps {
  hooks: UseLoginFormReturn;
}

const LoginFormContent: React.FC<LoginFormProps> = ({ hooks }) => {
  const { state, setEmail, setPassword, handleSubmit } = hooks;
  const { email, password, loading, error } = state;
  const { captchaToken, resetCaptcha } = useCaptcha();

  const onSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e, captchaToken || undefined);
    resetCaptcha();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <RenderIf condition={!!error}>
        <Alert variant="destructive" className="bg-red-950/50 border-red-900">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </RenderIf>
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
        disabled={loading || !captchaToken}
      >
        {handleTernary(loading, "Signing in...", "Sign In")}
      </Button>
    </form>
  );
};

const LoginForm: React.FC<LoginFormProps> = ({ hooks }) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

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
          <CaptchaProvider siteKey={siteKey} enabled={!!siteKey} theme="dark">
            <LoginFormContent hooks={hooks} />
          </CaptchaProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
