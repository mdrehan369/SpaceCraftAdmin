import { prismaClient } from "@/utils/prismaClient"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const currTime = new Date()
        let sixMonthAgo = new Date()
        sixMonthAgo.setMonth(currTime.getMonth() - 6)

        const visitsPerCity = await prismaClient.session.groupBy({
            by: ['city'],
            _count: true,
            where: {
                createdAt: {
                    gte: sixMonthAgo
                }
            }
        })

        return NextResponse.json({ message: "Success", data: { visitsPerCity } }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Server Error", error }, { status: 500 })
    }
}