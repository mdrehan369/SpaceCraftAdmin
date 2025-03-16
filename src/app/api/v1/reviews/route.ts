import { prismaClient } from "@/utils/prismaClient";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    try {

        const page = Number(request.nextUrl.searchParams.get("page")) || 1;
        const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
        const search = request.nextUrl.searchParams.get("search") || "";
        const rating = Number(request.nextUrl.searchParams.get("rating")) || 0

        if (page < 1 || limit < 1) throw new Error("Invalid Params!");

        const reviews = await prismaClient.review.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            {
                                name: { contains: search, mode: "insensitive" },
                            },
                            {
                                review: { contains: search, mode: "insensitive" },
                            }
                        ]
                    },
                    {
                        rating: { gte: rating }
                    }
                ]
            },
            skip: (page-1) * limit,
            take: limit
        })
        return NextResponse.json({ success: true, data: reviews })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, data: [] });
    }
}