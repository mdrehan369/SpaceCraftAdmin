import { NextResponse, type NextRequest } from "next/server";

import { prismaClient } from "@/utils/prismaClient";
import { City, Prisma, Property } from "@prisma/client";

export async function GET(request: NextRequest) {
    try {
        const page = Number(request.nextUrl.searchParams.get("page")) || 1;
        const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;
        const sort = Number(request.nextUrl.searchParams.get("sort")) || 1;
        const property =
            request.nextUrl.searchParams
                .get("property")
                ?.split(",")
                .filter((val) => val !== "") || [];
        const city =
            request.nextUrl.searchParams
                .get("city")
                ?.split(",")
                .filter((val) => val !== "") || [];
        const search = request.nextUrl.searchParams.get("search") || "";

        if (page < 1 || limit < 1) throw new Error("Invalid Params!");

        const fetchConsultationWhere: Prisma.FreeDesignConsultationWhereInput =
            {
                AND: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            };

        if (property.length > 0)
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (fetchConsultationWhere["AND"] as Array<Record<string, any>>)?.push(
                {
                    property: {
                        in: property as Property[],
                    },
                }
            );

        if (city.length > 0)
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (fetchConsultationWhere["AND"] as Array<Record<string, any>>)?.push(
                {
                    city: {
                        in: city as City[],
                    },
                }
            );

        const fetchConsultationArgs: Prisma.FreeDesignConsultationFindManyArgs =
            {
                skip: (page - 1) * limit,
                take: limit,
                omit: {
                    designId: true,
                },
                include: {
                    Design: true,
                },
                orderBy: [
                    {
                        createdAt: sort === 1 ? "desc" : "asc",
                    },
                ],
            };

        const consultations =
            await prismaClient.freeDesignConsultation.findMany({
                where: fetchConsultationWhere,
                ...fetchConsultationArgs,
            });

        return NextResponse.json({ success: true, data: consultations });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, data: [] });
    }
}
