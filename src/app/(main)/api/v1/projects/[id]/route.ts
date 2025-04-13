import { prismaClient } from "@/utils/prismaClient";
import { NextResponse, type NextRequest } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id } = await params
        const project = await prismaClient.project.findUnique({
            where: { id: Number(id) },
        });

        if (!project) throw new Error("Project not found!");

        await prismaClient.project.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ success: true, data: [] })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, data: [] });
    }
}