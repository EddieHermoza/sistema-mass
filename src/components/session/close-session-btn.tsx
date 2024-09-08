'use client';
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { cn } from "@/lib/utils"


type Props={
    label?:string
    iconSize?:number,
    className?:string
}

export default function CloseSessionButton({label,iconSize,className}:Props) {
    const router = useRouter()

    const handleCloseSession = () => {
        router.push("/")
    }

    return (
        <>
            <button onClick={handleCloseSession} className={cn("flex-center duration-200 p-2 rounded gap-2 hover:bg-secondary active:bg-pressed",className)}>
                <CiLogout size={iconSize}/>
                {label}
            </button>
        </>
    );
}