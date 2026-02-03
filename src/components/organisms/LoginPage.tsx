"use client";

import { useLoginFormHooks } from "@/hooks/pages/login-form.hook";
import LoginForm from "@/components/molecules/forms/LoginForm";

interface LoginPageProps {
  error?: string;
  errorMessage?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ error, errorMessage }) => {
  const hooks = useLoginFormHooks();
  return (
    <LoginForm hooks={hooks} urlError={error} urlErrorMessage={errorMessage} />
  );
};

export default LoginPage;
