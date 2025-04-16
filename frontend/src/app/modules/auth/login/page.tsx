'use client';

import { LoginPageForm } from "@/components/login-page-form";
import Logo from "@/components/Logo";

export default function Login() {
    return (
        <main className="relative min-h-screen flex items-center justify-center bg-[#f4f2f9] px-6">
            <div className="absolute top-4 left-4">
                <Logo />
            </div>

            <LoginPageForm />
        </main>
    );
}
