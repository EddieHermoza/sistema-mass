import db from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { UserDTO } from "@/types"
import { format } from "date-fns"


export const createUser = async (user: UserDTO) => {

    const { name, lastName, number, dni, email, role, status, password } = user

    try {

        const newUser = await db.user.create({
            data: {
                dni, 
                name, 
                lastName, 
                number, 
                email, 
                role, 
                status, 
                password
            }
        })

        return { success: true, user: newUser }

    } catch (error: any) {
        console.error("Error en el registro del usuario en la BD:", error.meta?.target[0])

        return {
            success: false,
            error: {
                msg: "Error en el registro del usuario en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}

const updateUser = async () => {

}

const deleteUser = async () => {

}

type GetUsersProps = {
    query: string,
    limit: number,
    page: number,
    status: boolean | null
}

export const getUsers = async ({ query, limit, page, status }: GetUsersProps) => {
    try {
        const pages = page || 1
        const skip = (pages - 1) * limit

        const users = await db.user.findMany({
            where: {
                AND: [
                    query ? { name: { contains: query } } : {},
                    status !== null && status !== undefined ? { status: status } : {},
                ]
            },
            skip: skip,
            take: limit,
        })


        const formattedUsers = users.map((user) => ({
            ...user,
            created: formatDate(new Date(user.created)),
            updated: formatDate(new Date(user.updated)),
        }))

        return formattedUsers

    } catch (error) {

        return []

    }
}


export const getUsersPage = async ({ query, limit, status }: GetUsersProps) => {
    try {
        const users = await db.user.findMany({
            where: {
                AND: [
                    query ? { name: { contains: query } } : {},
                    status !== null && status !== undefined ? { status: status } : {},
                ]
            }
        })

        const totalPages = Math.ceil(users.length / limit)

        return totalPages

    } catch (error) {
        return 0;
    }

}

const getUserById = async () => {

}