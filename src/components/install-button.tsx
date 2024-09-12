"use client";
import { useEffect, useState } from "react";
import { BsDownload } from "react-icons/bs";
import { Button } from "./ui/button";

const InstallButton = () => {
    const [installPrompt, setInstallPrompt] = useState<any>(null)
    const [isStandalone, setIsStandalone] = useState(false)
    const [isCompatible, setIsCompatible] = useState(false)

    useEffect(() => {

        const isInStandaloneMode =
            window.matchMedia("(display-mode: standalone)").matches ||
            (window.navigator as any).standalone === true
        setIsStandalone(isInStandaloneMode)


        const isMobile = window.matchMedia("(max-width: 768px)").matches

        if (isMobile && "serviceWorker" in navigator) {
            setIsCompatible(true)
        }

        const handleBeforeInstallPrompt = (event: any) => {
            event.preventDefault()
            setInstallPrompt(event)
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

        return () =>
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            )
    }, [])

    const handleInstallClick = () => {
        if (installPrompt) {
            installPrompt.prompt()
            installPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("El usuario aceptó la instalación")
                } else {
                    console.log("El usuario rechazó la instalación")
                }
                setInstallPrompt(null);
            })
        }
    }

    if (isStandalone || !isCompatible) return null

    return (
        <>
            {installPrompt && (
                <Button
                    onClick={handleInstallClick}
                    variant={"outline"}
                    size={"icon"}
                    className="duration-200"
                >
                    <BsDownload size={18} />
                </Button>
            )}
        </>
    );
};

export default InstallButton;
