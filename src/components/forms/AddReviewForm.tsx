"use client";

import Button from "@/components/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import addReviewSchema from "@/schemas/addReviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { addNewReview } from "@/actions/reviews.actions";
import { Star } from "lucide-react";
import { CustomToast } from "../CustomToast";

export default function ReviewForm() {
    const form = useForm<z.infer<typeof addReviewSchema>>({
        resolver: zodResolver(addReviewSchema),
        defaultValues: {
            name: "",
            review: "",
            address: "",
            rating: 5,
        },
    });
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof addReviewSchema>) => {
        const response = await addNewReview(data);
        if (response.success) {
            router.push("/reviews");
            CustomToast({ title: "Review added successfully!", description: "Public can see this review now!" })
        } else {
            CustomToast({ title: "Sorry some error occured!", description: "Please try again later!", variant: "Danger" })
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 w-[60%]'
            >
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Ex. John Doe' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Ex. 22/D New Woods'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='review'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Review</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Tell us about the experience!'
                                    {...field}
                                    className='resize-none'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='rating'
                    render={({ field }) => (
                        <FormItem className='space-y-3'>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(value) => field.onChange(Number(value))}
                                    defaultValue={field.value.toString()}
                                    className='flex flex-col gap-3'
                                >
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <FormItem
                                            key={rating}
                                            className='flex items-center space-x-3 space-y-0'
                                        >
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={rating.toString()}
                                                />
                                            </FormControl>
                                            <FormLabel className='font-normal'>
                                                <div className='mt-0 flex space-x-1 text-yellow-500'>
                                                    {[...Array(rating)].map(
                                                        (_, i) => (
                                                            <Star key={i} />
                                                        )
                                                    )}
                                                </div>
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type='submit'
                    disabled={
                        !form.formState.isValid || form.formState.isSubmitting
                    }
                >
                    Add Review
                </Button>
            </form>
        </Form>
    );
}
