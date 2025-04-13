import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";
import { checkSession } from "../actions/admin_session";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const isSession = await checkSession()
    if(!isSession) redirect("/auth")

    return (
        <main className="flex items-center justify-start">
            <Sidebar />
            <Container>{children}</Container>
            <Toaster />
        </main>
    );
}
