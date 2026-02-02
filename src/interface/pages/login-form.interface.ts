export interface LoginFormState {
  email: string;
  password: string;
  loading: boolean;
  error: string;
}

export interface UseLoginFormReturn {
  state: LoginFormState;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent, captchaToken?: string) => Promise<void>;
}
