import { NextResponse } from "next/server";
import { customers } from "@/data/data";
import { sleep } from "@/lib/utils";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "5")
    const query = searchParams.get("query") || ""
    const status = searchParams.get("status") || "all"


    const statusMap: { [key: string]: number | null } = {
        "en": 1,
        "dis": 0,
        "all": null
    }

 
    const statusValue = statusMap[status] ?? null


    let filteredCustomers = customers.filter(customer => {
    
        const matchesQuery = customer.name.toLowerCase().includes(query.toLowerCase()) 


        const matchesStatus = statusValue === null || customer.status === statusValue

        return matchesQuery && matchesStatus
    })

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex)

    const totalCustomers = filteredCustomers.length
    const totalPages = Math.ceil(totalCustomers / limit)
    await sleep(1000)
    return NextResponse.json({
        customers: paginatedCustomers,
        page,
        limit,
        totalPages,
        totalCustomers,
    })
}