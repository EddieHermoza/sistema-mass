import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Suspense } from "react";
import { Pagination } from "@/components/ui";
import { IoAddCircleOutline } from "react-icons/io5";
import ToogleStatus from "@/components/filters/toogle-status";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import UserTbl from "@/components/users/users-tbl";


export default function Page() {
    return (
        <>
            <div className="w-full flex items-end justify-between max-sm:flex-col-reverse gap-3">
                <div className="space-y-2 max-sm:w-full">
                    <label className="relative flex-center ">
                        <IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                        placeholder="Busqueda"
                        className="rounded-lg bg-background pl-8 w-full sm:w-96 duration-200"
                        />
                    </label>   
                    <ToogleStatus/>
                </div>

                <Link href={"/admin/users/create"} className="max-sm:w-full bg-black dark:bg-primary dark:hover:bg-primary/80 hover:bg-black/80 py-2 px-4 rounded text-white dark:text-primary-foreground flex-center gap-2 duration-200 focus:ring ring-ring ring-offset-2">
                    <IoAddCircleOutline size={22}/> Agregar Usuario 
                </Link>
            </div>
            <Card x-chunk="products-table">
                <CardHeader>
                    <CardTitle>Usuarios</CardTitle>
                    <CardDescription>Administra los permisos de tus usuarios</CardDescription>
                </CardHeader>
                <CardContent>
                    <UserTbl />
                </CardContent>
                <CardFooter className="flex-center ">
                    <Suspense>
                        <Pagination totalPages={11}/>
                    </Suspense>
                </CardFooter>
            </Card>
        </>
    );
}