"use client"

import { addNewDesign } from "@/actions/designs.action";
import Button from "@/components/Button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Categories } from "@/constants";
import addDesignSchema from "@/schemas/addDesignSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomToast } from "../CustomToast";

export default function DesignForm() {
    const form = useForm<z.infer<typeof addDesignSchema>>({
        resolver: zodResolver(addDesignSchema),
        defaultValues: {
            title: "",
            category: "1BHK",
        },
    });
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof addDesignSchema>) => {
        const response = await addNewDesign(data);
        if (response.success) {
            router.push("/designs");
            CustomToast({ title: "Design added successfully!", description: "Public can see this design now!" })
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
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder='' {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the public display title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                        <FormItem className='space-y-3'>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className='grid grid-cols-2 space-y-1'
                                >
                                    {Categories.map((category) => (
                                        <FormItem
                                            key={category}
                                            className='flex items-center space-x-3 space-y-0'
                                        >
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={category}
                                                />
                                            </FormControl>
                                            <FormLabel className='font-normal'>
                                                {category}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input
                                    accept='image/*'
                                    type='file'
                                    placeholder=''
                                    onChange={(e) =>
                                        field.onChange(e.target.files?.[0])
                                    }
                                />
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
                    Add Design
                </Button>
            </form>
        </Form>
    );
}
