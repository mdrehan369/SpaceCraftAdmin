"use client";

import Button from "@/components/Button";
import { CustomToast } from "@/components/CustomToast";
import ImageCarousel from "@/components/ImageCarousel";
import Loader from "@/components/Loader";
import CustomPagination from "@/components/Pagination";
import PerPage from "@/components/PerPage";
import SearchBox from "@/components/SearchBox";
import useQuery, { ParamType } from "@/hooks/useQuery";
import axiosInstance from "@/utils/axiosInstance";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export default function ProjectPage() {
    const { data, limit, page, loading, refetch, search, setParams } =
        useQuery<Project>({ api: "/projects", params: {} });
    const router = useRouter();

    const handleDelete = async (id: number) => {
        try {
            await axiosInstance.delete(`/projects/${id}`);
            CustomToast({ title: "Project deleted successfully!" });
            refetch();
        } catch (error) {
            console.log(error);
            CustomToast({
                title: "Sorry some error occured while deleting!",
                variant: "Danger",
            });
        }
    };

    return (
        <div className='p-8'>
            <div className='space-y-3 mb-3'>
                <h2 className='font-bold text-2xl text-gray-600 my-4'>
                    Projects
                </h2>
                <div className='flex items-center justify-between px-3'>
                    <SearchBox
                        search={search}
                        setSearch={(val) =>
                            setParams({ type: ParamType.SEARCH, value: val })
                        }
                    />
                    <Button
                        onClick={() => router.push("/projects/add")}
                        className='justify-self-start mr-auto ml-3'
                    >
                        Add Project
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
                    <div className='w-full h-full grid grid-cols-2 justify-items-center gap-3 justify-center gap-y-8'>
                        {data.map((project) => (
                            <div
                                key={project.id}
                                className='w-full px-2 py-6 bg-white rounded-xl flex flex-col items-center transition-all duration-500 relative group'
                            >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className='absolute top-0 right-0 w-full h-full hidden group-hover:flex bg-black/10 transition-all duration-300 items-center justify-center'>
                                            <button className='bg-red-200 text-red-800 text-sm cursor-pointer p-2 rounded-sm hover:border-red-800 border-transparent border-[1px] top-2 right-2 absolute hover:bg-red-200 transition-all'>
                                                <Trash2 />
                                            </button>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className='sm:max-w-md'>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Delete Project
                                            </DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete
                                                this project
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className='sm:justify-start'>
                                            <DialogClose asChild>
                                                <Button
                                                    type='button'
                                                    variant='secondary'
                                                    onClick={() =>
                                                        handleDelete(project.id)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <h3 className='text-2xl font-semibold text-gray-800 mb-0'>
                                    {project.title}
                                </h3>
                                <p className='text-gray-700 text-center max-w-2xl text-md leading-relaxed'>
                                    {project.workDetails}
                                </p>
                                <p className='text-gray-500 text-center mt-2 mb-2 text-sm italic'>
                                    {project.address}
                                </p>
                                <ImageCarousel images={project.imageUrls} />
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
