"use client";

import { useLoginPage } from "@/hooks/pages/use-login-page";
import LoginForm from "@/components/molecules/forms/LoginForm";

interface LoginPageProps {
  error?: string;
  errorMessage?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ error, errorMessage }) => {
  const hooks = useLoginPage();
  return (
    <LoginForm hooks={hooks} urlError={error} urlErrorMessage={errorMessage} />
  );
};

export default LoginPage;
