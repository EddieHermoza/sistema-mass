"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { ToogleTheme } from "@/components/ui/toggle-theme";

//Iconos de admin
import { FiUsers } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { IoShieldHalfSharp } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";

//Iconos de Cliente
import { MdStoreMallDirectory } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdOutlineDiscount } from "react-icons/md";
import { PiUserCheckLight } from "react-icons/pi";
import { TbMoneybag } from "react-icons/tb";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const OPTIONS = ["cliente", "admin"] as const
type Variant = (typeof OPTIONS)[number]

export default function NavBarMobile( { variant } : { variant : Variant } ) {
    const pathname = usePathname()
    const [activeLink, setActiveLink] = useState(pathname);

    const handleSetActiveLink = (link: string) => {
        setActiveLink(link);
    }

	const dashboardLinks = [
		{ label: "Dashboard", href: "/admin/dashboard", icon: AiOutlineLineChart },
		{ label: "Productos", href: "/admin/products", icon: BsBoxSeam },
		{ label: "Clientes", href: "/admin/customers", icon: FiUsers },
		{ label: "Inventario", href: "/admin/inventory", icon: MdOutlineInventory2 },
		{ label: "Proveedores", href: "/admin/providers", icon: FaUsersGear },
		{ label: "Usuarios", href: "/admin/users", icon: IoShieldHalfSharp },
		{ label: "Ventas", href: "/admin/sales", icon: MdOutlinePayment },
	]

    const shopLinks = [
		{ label: "Tienda", href: "/", icon: MdStoreMallDirectory },
		// { label: "Categorias", href: "/shop/categories", icon: MdCategory },
		{ label: "Descuentos", href: "/discounts", icon: MdOutlineDiscount },
		{ label: "Compras", href: "/orders", icon: TbMoneybag },
		{ label: "Cuenta", href: "/auth/login", icon: PiUserCheckLight },
	]

    return (
        <Sheet >
            <SheetTrigger className='duration-200 hover:text-primary hover:scale-110'>
                <HiOutlineMenuAlt2 size={32} />
            </SheetTrigger>
            <SheetContent side={"left"} className="flex flex-col gap-5 items-center w-[300px] border-border">
                <SheetHeader>
                    <SheetTitle className="text-2xl w-full flex justify-center items-start gap-1">
                        MASS
                        <Image src={"/mass_icon_dark.webp"} width={30} height={20} alt="icon" className="dark:invert duration-200"/>    
                    </SheetTitle>
                </SheetHeader>
                <div className="h-full flex flex-col justify-between pb-10 items-center w-full">
                    <ul className="w-full flex flex-col gap-2">
                        {
                            variant==="admin" ? (
                                dashboardLinks.map((link, index) => {
                                    const Icon = link.icon
                                    return (
                                        <li key={index} className="w-full relative">
                                            <SheetClose asChild className='w-full relative flex'>
                                                <Link
                                                    href={link.href}
                                                    onClick={() => handleSetActiveLink(link.href)}
                                                    className={` w-full rounded h-full flex items-center gap-2 tracking-wide p-3 ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${activeLink === link.href
                                                            ? "bg-primary shadow-md shadow-primary/50 text-primary-foreground"
                                                            : "active:bg-pressed hover:bg-secondary"
                                                        }`}
                                                >
                                                    <Icon size={20} />
                                                    {link.label}
                                                </Link>
                                            </SheetClose>
                                        </li>
                                    );
                                })
                            ):(
                                shopLinks.map((link, index) => {
                                    const Icon = link.icon;
                                    return (
                                        <li key={index} className="w-full relative">
                                            <SheetClose asChild className='w-full relative flex'>
                                                <Link
                                                    href={link.href}
                                                    onClick={() => handleSetActiveLink(link.href)}
                                                    className={` w-full rounded h-full flex items-center gap-2 tracking-wide p-3 ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${activeLink === link.href
                                                            ? "bg-primary shadow-md shadow-primary/50 text-primary-foreground"
                                                            : "active:bg-pressed hover:bg-secondary"
                                                        }`}
                                                >
                                                    <Icon size={20} />
                                                    {link.label}
                                                </Link>
                                            </SheetClose>
                                        </li>
                                    );
                                })
                            )
                        }

                    </ul>
                    <ToogleTheme align="start"/>
                </div>
            </SheetContent>
        </Sheet>
    )
}

