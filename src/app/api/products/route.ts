import { NextResponse } from "next/server";
import { ProductFormData } from "@/types";
import { ProductSchema } from "@/Schemas";
import { createProduct, getProducts, getProductsPages } from "@/app/api/helpers/product-actions";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const hasStock = searchParams.get("hasStock") || ""
    const category= searchParams.get("category") || ""
    const max= searchParams.get("max") || ""
    const order = searchParams.get("order") || ""
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "5")
    const query = searchParams.get("query") || ""
    const status = searchParams.get("status") || "all"


    const statusMap: { [key: string]: boolean | null } = {
        "en": true,
        "dis": false,
        "all": null
    }
    const statusValue = statusMap[status] ?? null

    const hasStockMap: { [key: string]: boolean | null } = {
        "true": true,
    }
    const stockValue = hasStockMap[hasStock] ?? null

    const data = await getProducts({ query, page, limit, status: statusValue ,category,hasStock:stockValue})
    const totalPages = await getProductsPages({ query, page, limit, status: statusValue,category,hasStock:stockValue })

    return NextResponse.json({
        products: data,
        totalPages: totalPages,
    })

}


export async function POST(request: Request) {
    try {
        const rawBody: ProductFormData = await request.json()

        const body = ProductSchema.parse(rawBody)

        const { name, description, price, discount, category, status,orderLimit } = body

        const product = {
            status: status==="1",
            name: name,
            description: description,
            price: parseFloat(price),
            discount: parseFloat(discount),
            category: category,
            orderLimit: parseInt(orderLimit)
        }

        const newProduct = await createProduct(product)


        const newProductResponse = {
            ...newProduct,
            product: {
                id: newProduct.product?.id.toString(),
                name,
                description,
                price,
                discount,
                orderLimit,
                status: product.status,
            }
        }


        if (newProductResponse.success) return NextResponse.json({ message: "Producto creado exitosamente", provider: newProductResponse.product }, { status: 201 })


        return NextResponse.json({ message: newProductResponse.error?.msg, error: newProductResponse.error?.details }, { status: 500 })


    } catch (error) {

        console.error("Error en el registro del proveedor en la REST API:", error)

        return NextResponse.json({ message: "Error en el registro del proveedor en la REST API:", error: error || "Error desconocido en la REST API" }, { status: 500 })
    }
}