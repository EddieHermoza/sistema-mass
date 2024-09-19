
import Mass from "../ui/mass";
import NavBarMobile from "../NavBarMobile";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CartButton } from "../cart/cart-ui";
import { ToogleTheme } from "@/components/ui/toggle-theme";
import UserPopover from "../session/user-popover";
import InstallButton from "../install-button";

export default function Header() {
    return (
        <header className="w-screen h-[80px] flex items-center justify-between px-5 sticky top-0 bg-background z-50">
            <NavBarMobile variant="cliente"/>
            <Mass/>
            <div className="flex-center gap-2">
                <InstallButton/>
                <CartButton/>
            </div>
        </header>
    );
}