import db from "@/lib/db"
import { ProductDTO } from "@/types"
import {formatDate} from "@/lib/utils"

export const createProduct = async (product: ProductDTO) => {
    const { status, name,description, price, discount,orderLimit,category } = product

    try {
        const newProduct = await db.product.create({
            data: {
                status,
                stock:0,
                name,
                description,
                price,
                category,
                orderLimit,
                discount
            }
        })


        return { success: true, product: newProduct }

    } catch (error: any) {
        console.error("Error en el registro del producto en la BD:", error.meta?.target[0])

        return {
            success: false,
            error: {
                msg: "Error en el registro del producto en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}

const updateProduct = async  () => {

}


export const deleteProduct = async  () => {
    
}

type GetProductsProps = {
    hasStock?:boolean | null
    category?:string
    max?:number,
    order?:string,
    query: string,
    limit: number,
    page: number,
    status: boolean | null
}


export const getProducts = async  ({page, query, limit, status,category,hasStock }: GetProductsProps) => {
    try {

        const pages = page || 1
        const skip = (pages - 1) * limit

        const conditions = []

        if (hasStock!== null && hasStock !== undefined && hasStock)  conditions.push({ stock: { gt: 0 } })
        

        if (query) conditions.push({ name: { contains: query } })
        

        if (category) conditions.push({ category: { contains: category } })
        

        if (status !== null && status !== undefined) conditions.push({ status })


        const products = await db.product.findMany({
            
            where:{
                AND:conditions
            },
            skip: skip,
            take: limit,
        })

        const formattedProducts = products.map((product) => ({
            ...product,
            created: formatDate(new Date(product.created)),
            updated: formatDate(new Date(product.updated)),
        }))

        return formattedProducts

    } catch (error) {

        return []

    }
}

export const getProductsInventory= async({ page, query, limit, status }: GetProductsProps)=>{
    try {

        const pages = page || 1
        const skip = (pages - 1) * limit

        let conditions=[]

        if (query) conditions.push({ name: { contains: query } })
        
        if (status !== null && status !== undefined) conditions.push({ status })
        

        const products = await db.product.findMany({
            select:{
                id:true,
                name:true,
                stock:true,
                lastStockEntry:true,
                status:true
            },
            where:{
                AND:conditions
            },
            skip: skip,
            take: limit,

            
        })

        const formattedProducts = products.map((product) => ({
            ...product,
            lastStockEntry: product.lastStockEntry !== null ? formatDate(new Date(product.lastStockEntry)) : null,
        }))

        return formattedProducts

    } catch (error) {

        return []

    }
}

export const getProductsPages = async  ({ query, limit, status,category,hasStock }: GetProductsProps) => {
    try {
        const conditions = []

        if (hasStock!== null && hasStock !== undefined && hasStock)  conditions.push({ stock: { gt: 0 } })

        if (query) conditions.push({ name: { contains: query } })
        

        if (category) conditions.push({ category: { contains: category } })
        

        if (status !== null && status !== undefined) conditions.push({ status })


        const totalProducts = await db.product.count({
            where: {
                AND: conditions,
            },
        });

        const totalPages = Math.ceil(totalProducts / limit)

        return totalPages

    } catch (error) {
        return 0
    }
}

const getProductById = async  () => {

}