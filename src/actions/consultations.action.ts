"use server"

import { prismaClient } from "@/utils/prismaClient";

export const markDone = async (id: number) => {
    try {
        const consultation =
            await prismaClient.freeDesignConsultation.findFirst({
                where: { id },
            });
        if (!consultation) throw new Error("No Consultation Found");

        await prismaClient.freeDesignConsultation.update({
            where: {
                id,
            },
            data: {
                isConsultationDone: true,
            },
        });

        return { success: true, data: [] }
    } catch (error) {
        console.log(error);
        return { success: false, data: [] };
    }
};
