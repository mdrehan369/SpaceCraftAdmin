import { Categories } from "@/constants";
import { z } from "zod";

const addDesignSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required!",
    }),
    category: z.enum(Categories).default("1BHK"),
    image: z.instanceof(File).refine((img) => ['image/jpeg', 'image/png', 'image/jpg'].includes(img.type)),
});

export default addDesignSchema
