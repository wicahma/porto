"use server";

import { AuthService } from "@/services/auth.service";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function signInWithGithubAction(
  redirectTo?: string,
  captchaToken?: string,
) {
  let result: {
    provider: Provider;
    url: string;
  } | null = null;
  try {
    result = await AuthService.signInWithGithub(redirectTo, captchaToken);
  } catch (error) {
    console.log("signInWithGithubAction Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to sign in with GitHub",
    };
  } finally {
    if (result?.url) {
      redirect(result.url);
    }
  }
  return {
    success: false,
    error: "Failed to obtain redirect URL for GitHub sign-in",
  };
}

export async function signOutAction() {
  try {
    await AuthService.signOut();
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to sign out",
    };
  }
}

export async function getSessionAction() {
  try {
    const session = await AuthService.getSession();
    return { success: true, data: session };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get session",
    };
  }
}

export async function getUserAction() {
  try {
    const user = await AuthService.getUser();
    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get user",
    };
  }
}

export async function validateAdminEmailAction(email: string) {
  try {
    const isValid = await AuthService.validateAdminEmail(email);
    return { success: true, isValid };
  } catch (error) {
    return {
      success: false,
      isValid: false,
      error:
        error instanceof Error ? error.message : "Failed to validate email",
    };
  }
}
