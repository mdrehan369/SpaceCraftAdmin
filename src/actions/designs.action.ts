"use server";

import { prismaClient } from "@/utils/prismaClient";
import { v2 } from "cloudinary";

v2.config({
    cloud_name: "dumndb22c",
    api_key: "652179528156963",
    api_secret: "UaHD8ROLBD-ObSHGGirr-iDfI00",
});

export async function fetchDesignsByCategory(category: string) {
    try {
        const response = await prismaClient.design.findMany({
            where: {
                Category: {
                    equals: category.replaceAll("-", " "),
                    mode: "insensitive",
                },
            },
        });
        return { success: true, data: response || [] };
    } catch (error) {
        console.error(error);
        return { success: false, data: [] };
    }
}

export async function fetchAllDesigns() {
    try {
        const categories = await prismaClient.design.groupBy({
            by: ["Category"],
        });

        const allDesigns: Array<{
            category: string;
            items: Array<{ id: number; title: string; imageUrl: string }>;
        }> = [];
        for (const category of categories) {
            const response = await prismaClient.design.findMany({
                where: { Category: category.Category },
                select: { id: true, imageUrl: true, title: true },
            });
            allDesigns.push({ category: category.Category, items: response });
        }

        return { success: true, data: allDesigns || [] };
    } catch (error) {
        console.error(error);
        return { success: false, data: [] };
    }
}

export async function fetchAllCategories() {
    try {
        const categories = await prismaClient.design.groupBy({
            by: ["Category"],
        });

        return { success: true, data: categories || [] };
    } catch (error) {
        console.error(error);
        return { success: false, data: [] };
    }
}

export const addNewDesign = async (data: {
    title: string;
    category: string;
    image: File;
}) => {
    const { title, category, image } = data;
    try {
        console.log(image);
        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const res: string | null = await new Promise((resolve, reject) => {
            v2.uploader
                .upload_stream(
                    { tags: ["nextjs-server-actions-upload-images"] },
                    function (error, result) {
                        if (error) {
                            console.log(error);
                            reject(null);
                            return;
                        }
                        console.log(result);
                        resolve(result && result.secure_url! || null);
                    }
                )
                .end(buffer);
        });

        if (!res) throw new Error("Error while uploading image");

        await prismaClient.design.create({
            data: {
                title,
                imageUrl: res,
                Category: category
            }
        })

        return { success: true, data: [] }

    } catch (error) {
        console.error(error);
        return { success: false, data: [] };
    }
};
