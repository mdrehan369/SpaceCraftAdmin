import { prismaClient } from "@/utils/prismaClient";
import { NextResponse, type NextRequest } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id } = await params
        const review = await prismaClient.review.findUnique({
            where: { id: Number(id) },
        });

        if (!review) throw new Error("Review not found!");

        await prismaClient.review.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ success: true, data: [] })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, data: [] });
    }
}
