'use client';

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "@/hooks/useLogin";

export function LoginPageForm() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        emailError,
        passwordError,
        isLoading,
        rememberMe,
        setRememberMe,
        handleLogin,
    } = useLogin();


    return (
        <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Seja bem-vindo</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        placeholder="Entre com seu usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <p className="text-sm text-red-500">{emailError}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Entre com sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                        <p className="text-sm text-red-500">{passwordError}</p>
                    )}
                </div>

                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(!!checked)}
                            className="border-gray-900 data-[state=checked]:bg-[#1577E0] data-[state=checked]:text-white"
                        />
                        <Label htmlFor="remember" className="font-medium text-sm text-gray-90">
                            Lembrar de mim?
                        </Label>
                    </div>

                    <div className="text-center font-medium text-sm underline text-gray-90 cursor-pointer">
                        Esqueceu sua senha?
                    </div>
                </div>

                <Button type="submit" className="w-full bg-[#1577E0]">
                    {isLoading ? "Entrando..." : "Entrar"}
                </Button>
            </form>

            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
