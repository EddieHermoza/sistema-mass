"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ProductInventory } from "@/types"
import { MovementForm } from "./movement-form"

type Props = {
    children?:React.ReactNode
    product: ProductInventory | undefined
    open: boolean,
    handleOpenChange: (open: boolean) => void
}

export function MovementDialog({ open, product, handleOpenChange,children }: Props) {
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Nuevo Movimiento</DialogTitle>
                    <DialogDescription className="text-xl flex justify-between items-center">
                        <span>{product?.name}</span> 
                        <span>ID: {product?.id}</span>
                    </DialogDescription>

                    <>
                        {children}
                    </>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}