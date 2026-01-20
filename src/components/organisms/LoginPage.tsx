"use client";

import { useLoginFormHooks } from "@/hooks/pages/login-form.hook";
import LoginForm from "@/components/molecules/forms/LoginForm";

const LoginPage = () => {
  const hooks = useLoginFormHooks();
  return <LoginForm hooks={hooks} />;
};

export default LoginPage;
