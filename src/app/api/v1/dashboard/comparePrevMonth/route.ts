import { prismaClient } from "@/utils/prismaClient"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const currTime = new Date()
        let oneMonthAgo = new Date()
        let twoMonthAgo = new Date()
        oneMonthAgo.setMonth(currTime.getMonth()-1)
        twoMonthAgo.setMonth(currTime.getMonth()-2)

        const visitsThisMonth = await prismaClient.session.count({
            where: {
                createdAt: {
                    lte: currTime,
                    gte: oneMonthAgo
                }
            }
        })

        const visitsPrevMonth = await prismaClient.session.count({
            where: {
                createdAt: {
                    lte: oneMonthAgo,
                    gte: twoMonthAgo
                }
            }
        })

        return NextResponse.json({ message: "Success", data: { visitsThisMonth, visitsPrevMonth } }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Server Error", error }, { status: 500 })
    }
}