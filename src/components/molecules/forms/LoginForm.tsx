import { Alert, AlertDescription } from "@/components/atoms/popups/alert";
import { Button } from "@/components/atoms/buttons/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/cards/card";
import { UseLoginFormReturn } from "@/interface/pages/login-form.interface";
import React from "react";
import { RenderIf } from "@/utils/helper/render-if";
import { CaptchaProvider, useCaptcha } from "@/components/atoms/captcha";

interface LoginFormProps {
  hooks: UseLoginFormReturn;
  urlError?: string;
  urlErrorMessage?: string;
}

const LoginFormContent: React.FC<LoginFormProps> = ({
  hooks,
  urlError,
  urlErrorMessage,
}) => {
  const { state, handleGithubSignIn } = hooks;
  const { loading, error } = state;
  const { captchaToken, resetCaptcha } = useCaptcha();

  const displayError =
    error || (urlError && (urlErrorMessage || "Authentication failed"));

  const handleSignIn = async () => {
    await handleGithubSignIn(captchaToken || undefined);
    resetCaptcha();
  };

  return (
    <div className="space-y-4">
      <RenderIf condition={!!displayError}>
        <Alert variant="destructive" className="bg-red-950/50 border-red-900">
          <AlertDescription>{displayError}</AlertDescription>
        </Alert>
      </RenderIf>

      <Button
        onClick={handleSignIn}
        disabled={loading || !captchaToken}
        className="w-full bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        {loading ? "Signing in..." : "Sign in with GitHub"}
      </Button>

      <p className="text-xs text-center text-neutral-500">
        Only authorized GitHub accounts can access this admin panel
      </p>
    </div>
  );
};

const LoginForm: React.FC<LoginFormProps> = ({
  hooks,
  urlError,
  urlErrorMessage,
}) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4">
      <Card className="w-full max-w-md border-neutral-800 bg-neutral-900/50 backdrop-blur">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            Admin Login
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Sign in with your GitHub account to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CaptchaProvider siteKey={siteKey} enabled={!!siteKey} theme="dark">
            <LoginFormContent
              hooks={hooks}
              urlError={urlError}
              urlErrorMessage={urlErrorMessage}
            />
          </CaptchaProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
