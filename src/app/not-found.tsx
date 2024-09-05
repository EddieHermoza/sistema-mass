import Link from 'next/link'
import { headers } from 'next/headers'

export default function NotFound() {
    const headersList = headers()
    const domain = headersList.get('host')

    return (
        <div className='w-screen h-screen bg-background flex-center flex-col gap-5'>
            <h1 className='text-2xl'>
               Tiendas MASS
            </h1>
            <h2 className='text-muted-foreground'>Página no encontrada </h2>

            <Link href={"/admin/dashboard"} className="max-w-40 bg-black dark:bg-primary dark:hover:bg-primary/80 hover:bg-black/80 py-2 px-4 rounded text-white dark:text-primary-foreground flex-center gap-2 duration-200 focus:ring ring-ring ring-offset-2">
                Regresar
            </Link>

        </div>
    )
}