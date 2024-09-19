import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {



    return (
        <div className='w-screen h-screen bg-background flex-center flex-col gap-5'>
            <h1 className='text-2xl'>
               Tiendas MASS
            </h1>
            <h2 className='text-muted-foreground'>Página no encontrada </h2>

            <Button asChild>
                <Link href={"/"}>
                    Regresar
                </Link>
            </Button>

        </div>
    )
}