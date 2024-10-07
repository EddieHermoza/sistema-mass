import db from "@/lib/db"
import { ProviderDTO } from "@/types"
import { format } from 'date-fns';



export const createProvider = async (provider: ProviderDTO) => {
    const { status, web, name, ruc, email, number, legal } = provider

    try {
        const newProvider = await db.provider.create({
            data: {
                status,
                ruc,
                name,
                legal,
                web,
                email,
                number,
            }
        })


        return { success: true, provider: newProvider }

    } catch (error: any) {
        console.error("Error en el registro del proveedor en la BD:", error.meta?.target[0])

        return {
            success: false,
            error: {
                msg: "Error en el registro del proveedor en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}



const updateProvider = async () => {

}

const deleteProvider = async () => {

}


type GetProvidersProps = {
    query: string,
    limit: number,
    page: number,
    status: boolean | null
}

export const getProviders = async ({ query, limit, page, status }: GetProvidersProps) => {
    try {

        console.log(status)
        const pages = page || 1
        const skip = (pages - 1) * limit

        const providers = await db.provider.findMany({
            where: {
                AND: [
                    query ? { name: { contains: query } } : {},
                    status !== null && status !== undefined ? { status: status } : {},
                ]
            },
            skip: skip,
            take: limit,
        })

        const formattedProviders = providers.map((provider) => ({
            ...provider,
            created: format(new Date(provider.created), 'dd-MM-yyyy HH:mm'),
            updated: format(new Date(provider.created), 'dd-MM-yyyy HH:mm'),
        }))

        return formattedProviders

    } catch (error) {

        return []

    }
}


export const getProvidersPages = async ({ query, limit, status }: GetProvidersProps) => {
    try {
        const providers = await db.provider.findMany({
            where: {
                AND: [
                    query ? { name: { contains: query } } : {},
                    status !== null && status !== undefined ? { status: status } : {},
                ]
            }
        })

        const totalPages = Math.ceil(providers.length / limit)

        return totalPages

    } catch (error) {
        return 0;
    }

}


const getProviderById = async () => {

}