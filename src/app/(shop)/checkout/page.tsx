import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <main className="bg-background flex-center flex-col gap-10 h-[calc(100vh-120px)]">
            <h1 className=" text-2xl">En progreso</h1>
            <div className="loader"></div>

            <Button asChild >
                <Link href={"/"}>
                    Volver a la Tienda
                </Link>
            </Button>
        </main>
    );
}