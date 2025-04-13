import Dashboard from "@/components/Dashboard";
import axiosInstance from "@/utils/axiosInstance";

const apiHelper = async (endpoint: string) => {
    try {
        const data = await axiosInstance.get(endpoint);
        if (data.data.message == "Success") return data.data.data;
    } catch (error) {
        console.log(error);
    }
};

export default async function Home() {

    const visitsPerCity: Array<{ _count: number; city: string }> =
        (await apiHelper("/dashboard/cities"))?.visitsPerCity || [];
    const visitsPerDesign: Array<{ _count: number; design: string }> =
        (await apiHelper("/dashboard/visitsPerDesign"))?.visitsPerDesign || [];
    const visitsPerMonth: Array<{ count: number; month: string }> =
        JSON.parse((await apiHelper("/dashboard/visits"))?.visitsPerMonth || '[]') || [];
    const visitsThisMonth: Array<{ count: number; date: string }> =
        JSON.parse((await apiHelper("/dashboard/visitsThisMonth"))?.visitsThisMonth || '[]') || [];

    return (
        <Dashboard
            visitsPerCity={visitsPerCity}
            visitsPerDesign={visitsPerDesign}
            visitsPerMonth={visitsPerMonth}
            visitsThisMonth={visitsThisMonth}
        />
    );
}
