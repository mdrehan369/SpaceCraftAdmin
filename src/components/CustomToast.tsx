import { toast } from "sonner";

export const CustomToast = ({ title, description, variant = "Success" }: { title: string, description?: string, variant?: "Success" | "Danger" }) => {
    if(variant === "Success") return toast(title, {
        style: {
            backgroundColor: "#ffd6a7",
            borderColor: "transparent",
        },
        richColors: true,
        description: description
    });
    else return toast(title, {
        style: {
            backgroundColor: "#ff5959",
            borderColor: "transparent",
        },
        richColors: true,
        description: description
    });
}