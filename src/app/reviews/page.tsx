"use client";

import Button from "@/components/Button";
import { CustomToast } from "@/components/CustomToast";
import DeleteButton from "@/components/DeleteButton";
import Loader from "@/components/Loader";
import CustomPagination from "@/components/Pagination";
import PerPage from "@/components/PerPage";
import SearchBox from "@/components/SearchBox";
import useQuery, { ParamType } from "@/hooks/useQuery";
import axiosInstance from "@/utils/axiosInstance";
import { Review } from "@prisma/client";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
    const { data, loading, page, limit, setParams, search, refetch } = useQuery<Review>({
        api: "/reviews",
        params: {},
    });
    const router = useRouter();
    return (
        <div className='p-8'>
            <div className='space-y-3 mb-3'>
                <h2 className='font-bold text-2xl text-gray-600 my-4'>
                    Reviews
                </h2>
                <div className='flex items-center justify-between px-3'>
                    <SearchBox
                        search={search}
                        setSearch={(val) =>
                            setParams({ type: ParamType.SEARCH, value: val })
                        }
                    />
                    <Button
                        onClick={() => router.push("/reviews/add")}
                        className='justify-self-start mr-auto ml-3'
                    >
                        Add Review
                    </Button>
                    <PerPage
                        limit={limit}
                        setLimit={(val) =>
                            setParams({ type: ParamType.LIMIT, value: val })
                        }
                    />
                </div>
            </div>
            {!loading ? (
                <>
                    <div className='w-full h-full grid grid-cols-2 justify-items-center gap-3 justify-center'>
                        {data.map((review) => (
                            <div
                                key={review.id}
                                className='bg-gray-100 p-6 rounded-lg shadow-md relative group'
                            >
                                <DeleteButton
                                    title='Delete Review'
                                    description='Are you sure you want to delete this design'
                                    handler={async (id) => {
                                        try {
                                            await axiosInstance.delete(`/reviews/${id}`)
                                            CustomToast({ title: "Review deleted successfully!" })
                                            refetch()
                                        } catch (error) {
                                            console.log(error)
                                            CustomToast({ title: "Sorry some error occured while deleting!", variant: "Danger" })
                                        }
                                    }}
                                    id={review.id}
                                />

                                <p className='text-gray-700 italic'>
                                    &quot;{review.review}&quot;
                                </p>
                                <div className='mt-4'>
                                    <h3 className='text-lg font-semibold'>
                                        {review.name}
                                    </h3>
                                    <p className='text-sm text-gray-500'>
                                        {review.address}
                                    </p>
                                </div>
                                {/* Star Rating */}
                                <div className='mt-4 flex space-x-1 text-yellow-500'>
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} />
                                    ))}
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
