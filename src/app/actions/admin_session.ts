"use server";

import { prismaClient } from "@/utils/prismaClient";
import { cookies } from "next/headers";

function generateRandomString(length: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
  
    return result;
  }
  

export async function createSession() {
    try {
        // Deleting all previous sessions
        await prismaClient.adminSession.deleteMany({});
        const session = await prismaClient.adminSession.create({
            data: {
                token: generateRandomString(15)
            }
        });
        const cookieStore = await cookies();
        cookieStore.set("authToken", session.token);
    } catch (error) {
        console.log(error);
    }
}

export async function checkSession(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("authToken")?.value;

        const session = await prismaClient.adminSession.findFirst({
            where: {
                token,
            },
        });

        if (!session) return false;

        if (
            Date.now() - new Date(session.createdAt).getTime() >
            24 * 60 * 60 * 1000
        )
            return false;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function deleteSession() {
    try {
        // Deleting all previous sessions
        await prismaClient.adminSession.deleteMany({});
        const cookieStore = await cookies();
        cookieStore.delete("authToken");
    } catch (error) {
        console.log(error);
    }
}
