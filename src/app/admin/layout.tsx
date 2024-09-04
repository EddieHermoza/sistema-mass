import NavAdmin from "@/components/NavBar";
import NavBarMobile from "@/components/NavBarMobile";
import { ToogleTheme } from "@/components/ui/toggle-theme";

export default function AdminLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
        <header className="w-screen h-[60px] flex items-center justify-between xl:justify-end px-5">
            <NavBarMobile/>
            <ToogleTheme/>
        </header>
        <div className="flex h-[calc(100vh-60px)] relative w-screen ">
            <NavAdmin/>
            <main className={` w-full h-full relative bg-secondary px-2 py-5 sm:p-10 flex flex-col gap-5 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-primary`}>
                {children}
            </main>
        </div>
    </>
  );
}