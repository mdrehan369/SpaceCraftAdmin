import { prismaClient } from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const currTime = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(currTime.getMonth() - 1);

        const visitsPerMonth = await prismaClient.$queryRaw`
            SELECT DATE_TRUNC('day', "createdAt") AS date, COUNT(*) AS count
            FROM "Session"
            WHERE "createdAt" > ${oneMonthAgo}
            GROUP BY date
            ORDER BY date DESC;
            `;

        const stringifiedData = JSON.stringify(visitsPerMonth, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        );

        return NextResponse.json(
            { message: "Success", data: { visitsThisMonth: stringifiedData } },
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
