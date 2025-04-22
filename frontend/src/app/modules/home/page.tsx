
import HomeContent from "@/components/home-content";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function Home() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
        redirect('/modules/auth/login');
    }

    return (
        <main className="min-h-screen min-w-screen overflow-hidden bg-[#f4f2f9] flex flex-col gap-6 p-6">
            <HomeContent />
        </main>
    );
}
