import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname == "/auth") return NextResponse.next();

    const authToken = request.cookies.get("authToken")?.value;
    if (!authToken) return NextResponse.redirect(new URL("/auth", request.url));

    return NextResponse.next();
}

export const config = {
    matcher: "/"
};
