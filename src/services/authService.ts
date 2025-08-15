import type { LoginProps, SignupProps } from "../types/authTypes";
import supabase from "./supabase";

export async function signup({ fullName, email, password }: SignupProps) {
    const { data, error } = await supabase.auth.signUp({
        email, password, options: {
            data: {
                fullName
            }
        }
    });

    if (error)
        throw new Error(error.message);

    return data;
}

export async function signin({ email, password }: LoginProps) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error)
        throw new Error(error.message);

    return data;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error)
        throw new Error(error.message);
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

