import { prismaClient } from "@/utils/prismaClient"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const currTime = new Date()
        let sixMonthAgo = new Date()
        sixMonthAgo.setMonth(currTime.getMonth() - 6)

        const visitsPerDesign = await prismaClient.designCategory.groupBy({
            by: ['design'],
            _count: true,
            where: {
                Session: {
                    createdAt: {
                        gte: sixMonthAgo
                    }
                }
            }
        })

        return NextResponse.json({ message: "Success", data: { visitsPerDesign } }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Server Error", error }, { status: 500 })
    }
}