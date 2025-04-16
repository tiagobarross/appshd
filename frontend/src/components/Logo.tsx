// app/components/Logo.tsx
import Image from "next/image";

export default function Logo() {
    return (
        <Image
            src="/assets/saudehd-logo-brand-new.png"
            alt="Logo da empresa"
            width={120}
            height={120}
            priority
            className="rounded-md"
        />
    );
}
