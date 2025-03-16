"use server"

import { prismaClient } from "@/utils/prismaClient";
import { Prisma } from "@prisma/client";

export const addNewReview = async (data: Prisma.ReviewCreateInput) => {
    try {
        await prismaClient.review.create({
            data
        })
        return { success: true, data: [] }
    } catch (error) {
        console.error(error)
        return { success: false, data: [] }
    }
}