"use server";

import { AuthService } from "@/services/auth.service";
import { cookies } from "next/headers";

export async function signInAction(email: string, password: string) {
  try {
    const result = await AuthService.signIn(email, password);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to sign in",
    };
  }
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
