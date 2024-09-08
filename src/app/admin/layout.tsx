import NavAdmin from "@/components/NavBar";
import NavBarMobile from "@/components/NavBarMobile";
import Image from "next/image";
import UserPopover from "@/components/session/user-popover";
export default function AdminLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<header className="w-screen h-[60px] flex items-center justify-between px-5">
				<div className="flex gap-1 justify-center items-start max-xl:hidden">
					<span className="text-2xl font-semibold">MASS </span>
					<Image src={"/mass_icon_dark.webp"} width={30} height={20} alt="icon" className="dark:invert duration-200"/>
				</div>
				<NavBarMobile />
				<UserPopover/>
			</header>
			<div className="flex h-[calc(100vh-60px)] relative w-screen ">
				<NavAdmin />
				<main className={` w-full h-full relative bg-secondary px-2 py-5 sm:p-10 flex flex-col gap-5 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-primary`}>
					{children}
				</main>
			</div>
		</>
	);
}