'use client';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link";
import CloseSessionButton from "./close-session-btn";
import { PiUserCheckLight } from "react-icons/pi";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function UserPopover() {
	return (
		<>
			<Popover>
				<PopoverTrigger className="hover:bg-secondary duration-200 border-border border rounded-lg p-2 flex-center gap-2 text-sm"> <PiUserCheckLight size={22} /> Usario Nombre</PopoverTrigger>
				<PopoverContent align="end" className="flex flex-col gap-1 items-start text-sm w-auto">
					{/* <Link href={"/"} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-lg ">
                    <AiOutlineInfoCircle size={18}/>
                    Información
                </Link> */}
					<CloseSessionButton iconSize={18} label="Cerrar Sesión" />
				</PopoverContent>
			</Popover>
		</>
	);
}