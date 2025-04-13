import { prismaClient } from "@/utils/prismaClient";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const search = request.nextUrl.searchParams.get("search") || ""
        const page = Number(request.nextUrl.searchParams.get("page")) || 1;
        const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;

        if(search === "") {
            const projects = await prismaClient.project.findMany({
                skip: (page - 1) * limit,
                take: limit
            })
            
            return NextResponse.json({ success: true, data: projects })
        }

        const projects = await prismaClient.project.findMany({
            where: {
                title: {
                    contains: search
                },
                customers: {
                    hasSome: [search]
                }
            },
            skip: (page - 1) * limit,
            take: limit
        })

        return NextResponse.json({ success: true, data: projects })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, data: [] })
    }
}