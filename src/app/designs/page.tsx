"use client";

import Button from "@/components/Button";
import { CustomToast } from "@/components/CustomToast";
import DeleteButton from "@/components/DeleteButton";
import Loader from "@/components/Loader";
import CustomPagination from "@/components/Pagination";
import PerPage from "@/components/PerPage";
import SearchBox from "@/components/SearchBox";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Categories } from "@/constants";
import useQuery, { ParamType } from "@/hooks/useQuery";
import axiosInstance from "@/utils/axiosInstance";
import { Design } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Designs() {
    const [category, setCategory] = useState<string[]>([]);
    const router = useRouter();

    const { data, loading, page, limit, setParams, search, refetch } = useQuery<Design>({
        api: "/designs",
        params: { category: category.join(",") },
    });
    return (
        <div className='p-8'>
            <div className='space-y-3 mb-3'>
                <h2 className='font-bold text-2xl text-gray-600 my-4'>
                    Designs
                </h2>
                <div className='flex items-center justify-between px-3'>
                    <SearchBox
                        search={search}
                        setSearch={(val) =>
                            setParams({ type: ParamType.SEARCH, value: val })
                        }
                    />
                    <Button
                        onClick={() => router.push("/designs/add")}
                        className='justify-self-start mr-auto ml-3'
                    >
                        Add Design
                    </Button>
                    <PerPage
                        limit={limit}
                        setLimit={(val) =>
                            setParams({ type: ParamType.LIMIT, value: val })
                        }
                    />
                </div>
                <div className='flex flex-wrap items-center justify-start gap-6 px-4'>
                    {Categories.map((ctg) => (
                        <div key={ctg} className='flex gap-2'>
                            <Checkbox
                                id={ctg}
                                className='cursor-pointer'
                                onCheckedChange={(e) => {
                                    if (e.valueOf()) {
                                        setCategory([...category, ctg]);
                                        setParams({
                                            type: ParamType.OTHER_PARAMS,
                                            value: {
                                                category: [
                                                    ...category,
                                                    ctg,
                                                ].join(","),
                                            },
                                        });
                                    } else {
                                        setParams({
                                            type: ParamType.OTHER_PARAMS,
                                            value: {
                                                category: category
                                                    .filter(
                                                        (val) => val !== ctg
                                                    )
                                                    .join(","),
                                            },
                                        });
                                        setCategory((prev) =>
                                            prev.filter((val) => val !== ctg)
                                        );
                                    }
                                }}
                            />
                            <Label htmlFor={ctg} className='cursor-pointer'>
                                {ctg}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            {!loading ? (
                <>
                    <div className='w-full h-full grid grid-cols-2 justify-items-center gap-3 justify-center'>
                        {data.map((dsgn) => (
                            <div
                                key={dsgn.id}
                                className='border-0 w-[35vw] min-h-[60vh] rounded hover:bg-gray-100 p-4 cursor-pointer transition-colors relative group'
                            >
                                <DeleteButton
                                    title='Delete Design'
                                    description='Are you sure you want to delete this design'
                                    handler={async (id) => {
                                        try {
                                            await axiosInstance.delete(`/designs/${id}`)
                                            CustomToast({ title: "Design deleted successfully!" })
                                            refetch()
                                        } catch (error) {
                                            console.log(error)
                                            CustomToast({ title: "Sorry some error occured while deleting!", variant: "Danger" })
                                        }
                                    }}
                                    id={dsgn.id}
                                />

                                <Image
                                    alt={dsgn.title}
                                    src={dsgn.imageUrl}
                                    width={200}
                                    height={200}
                                    className='w-full h-[50vh] object-cover'
                                />
                                <div className='flex items-center justify-between mt-2'>
                                    <span className='w-[80%] text-gray-600 h-fit text-sm font-medium'>
                                        {dsgn.title
                                            .replaceAll("-", " ")
                                            .toLocaleUpperCase()}
                                    </span>
                                    <span className='w-fit p-2 text-orange-500 bg-orange-200 rounded-3xl text-center text-xs uppercase font-medium'>
                                        {dsgn.Category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <CustomPagination
                        page={page}
                        setPage={(val) => {
                            setParams({
                                type: ParamType.PAGE,
                                value: val.toString(),
                            });
                            window.scrollTo(0, 0);
                        }}
                        isNextAvailable={data.length === limit}
                    />
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}
