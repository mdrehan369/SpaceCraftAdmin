import { prismaClient } from "@/utils/prismaClient";
import { NextResponse, type NextRequest } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id } = await params
        const design = await prismaClient.design.findUnique({
            where: { id: Number(id) },
        });

        if (!design) throw new Error("Design not found!");

        await prismaClient.design.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ success: true, data: [] })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, data: [] });
    }
}