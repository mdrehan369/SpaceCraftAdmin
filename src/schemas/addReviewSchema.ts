import { z } from "zod";

const addReviewSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required!",
    }),
    address: z.string().min(1, {
        message: "Address is required!",
    }),
    review: z.string().min(1, {
        message: "Review is required!",
    }),
    rating: z.number().min(0, {
        message: "Invalid rating!",
    }).max(5).default(1),
});

export default addReviewSchema
