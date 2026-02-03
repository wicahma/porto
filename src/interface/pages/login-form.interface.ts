export interface LoginFormState {
  loading: boolean;
  error: string;
}

export interface UseLoginFormReturn {
  state: LoginFormState;
  handleGithubSignIn: (captchaToken?: string) => Promise<void>;
}
