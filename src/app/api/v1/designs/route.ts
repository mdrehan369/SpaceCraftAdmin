import { NextResponse, type NextRequest } from "next/server";

import { prismaClient } from "@/utils/prismaClient";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
    try {
        const page = Number(request.nextUrl.searchParams.get("page")) || 1;
        const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
        const sort = Number(request.nextUrl.searchParams.get("sort")) || 1;
        const category =
            request.nextUrl.searchParams
                .get("category")
                ?.split(",")
                .filter((val) => val !== "") || [];
        const search = request.nextUrl.searchParams.get("search") || "";

        if (page < 1 || limit < 1) throw new Error("Invalid Params!");

        const fetchDesignWhere: Prisma.DesignWhereInput = {
            title: {
                contains: search,
            },
        };
        const fetchDesignArgs: Prisma.DesignFindManyArgs = {
            skip: (page - 1) * limit,
            take: limit,
            select: {
                title: true,
                Category: true,
                imageUrl: true,
                id: true,
            },
            orderBy: {
                createdAt: sort === 1 ? "asc" : "desc",
            },
        };

        let designs = [];
        if (category.length > 0)
            designs = await prismaClient.design.findMany({
                where: {
                    AND: [
                        {
                            Category: {
                                in: category,
                                mode: "insensitive",
                            },
                        },
                        { ...fetchDesignWhere },
                    ],
                },
                ...fetchDesignArgs,
            });
        else
            designs = await prismaClient.design.findMany({
                where: fetchDesignWhere,
                ...fetchDesignArgs,
            });

        return NextResponse.json({ success: true, data: designs });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, data: [] });
    }
}