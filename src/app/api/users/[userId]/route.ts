import { NextResponse } from "next/server"
import { users } from "@/data/data"

export async function GET(request: Request, context: { params: { id: string } }) {
    const { id } = context.params

    const user = users.find(user => user.id === parseInt(id))

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 })


    return NextResponse.json({ user })
}