"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { IoShieldHalfSharp } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";


export default function NavAdmin() {
	const pathname = usePathname();
	const [activeLink, setActiveLink] = useState(pathname);

	const handleSetActiveLink = (link: string) => {
		setActiveLink(link);
	};

	const dashboardLinks = [
		{ label: "Dashboard", href: "/admin/dashboard", icon: AiOutlineLineChart },
		{ label: "Productos", href: "/admin/products", icon: BsBoxSeam },
		{ label: "Clientes", href: "/admin/customers", icon: FiUsers },
		{ label: "Inventario", href: "/admin/inventory", icon: MdOutlineInventory2 },
		{ label: "Proveedores", href: "/admin/providers", icon: FaUsersGear },
		{ label: "Usuarios", href: "/admin/users", icon: IoShieldHalfSharp },
		{ label: "Ventas", href: "/admin/sales", icon: MdOutlinePayment },
	];

	return (
		<nav className="h-full flex flex-col justify-between pb-16 px-2 max-xl:hidden">
			<ul className="w-full flex flex-col gap-3 items-center text-sm overflow-y-auto py-2">
				<TooltipProvider delayDuration={0}>
					{dashboardLinks.map((link, index) => {
						const Icon = link.icon;
						return (
							<li key={index} className="w-full relative">
								<Tooltip>
									<TooltipTrigger asChild>
										<Link
											href={link.href}
											onClick={() => handleSetActiveLink(link.href)}
											className={`w-full rounded h-full flex-center duration-200 tracking-wide p-4 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${activeLink.startsWith(link.href)
												? "bg-primary shadow-md shadow-primary/50"
												: "active:bg-pressed hover:bg-secondary"
												}`}
										>
											<Icon size={30} />
										</Link>
									</TooltipTrigger>
									<TooltipContent side="right" >
										<p className="text-base">{link.label}</p>
									</TooltipContent>
								</Tooltip>
							</li>
						);
					})}
				</TooltipProvider>
			</ul>
			<Link href={"/"} className="flex-center duration-200 border border-border p-3 rounded hover:bg-secondary active:bg-pressed">
				<CiLogout size={22}/>
			</Link>
		</nav>
	);
}