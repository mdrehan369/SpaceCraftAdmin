import { prismaClient } from "@/utils/prismaClient";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const currTime = new Date();
        let nineMonthAgo = new Date();
        nineMonthAgo.setMonth(currTime.getMonth() - 9);

        const visitsPerMonth = await prismaClient.$queryRaw`
            SELECT DATE_TRUNC('month', "createdAt") AS month, COUNT(*) AS count
            FROM "Session"
            WHERE "createdAt" > ${nineMonthAgo}
            GROUP BY month
            ORDER BY month DESC;
            `;

        const stringifiedData = JSON.stringify(visitsPerMonth, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        );

        return NextResponse.json(
            { message: "Success", data: { visitsPerMonth: stringifiedData } },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Server Error", error },
            { status: 500 }
        );
    }
};
