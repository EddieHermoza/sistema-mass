import { NextResponse } from "next/server";
import { sales } from "@/data/data";
import { sleep } from "@/lib/utils";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "5")
    const query = searchParams.get("query") || ""
    const status = searchParams.get("statusSale") || "all"


    const statusMap: { [key: string]: number | null } = {
        "pend": 0,
        "comp": 1,
        "all": null
    }

 
    const statusValue = statusMap[status] ?? null


    let filteredSales = sales.filter(sales => {
    
        const matchesQuery = sales.transaction.toLowerCase().includes(query.toLowerCase()) 


        const matchesStatus = statusValue === null || sales.status === statusValue

        return matchesQuery && matchesStatus
    })

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedSales = filteredSales.slice(startIndex, endIndex)

    const totalSales = filteredSales.length
    const totalPages = Math.ceil(totalSales / limit)
    await sleep(1000)
    return NextResponse.json({
        sales: paginatedSales,
        page,
        limit,
        totalPages,
        totalSales,
    })
}