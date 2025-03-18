import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { Design } from "@prisma/client";

export default function DesignCard({
    dsgn,
    handleDelete,
}: {
    dsgn: Design;
    handleDelete?: (id: number) => void;
}) {
    return (
        <div
            className='border-0 w-[35vw] min-h-[60vh] rounded hover:bg-gray-100 p-4 cursor-pointer transition-colors relative group'
        >
            {handleDelete && (
                <DeleteButton
                    title='Delete Design'
                    description='Are you sure you want to delete this design'
                    handler={handleDelete}
                    id={dsgn.id}
                />
            )}

            <Image
                alt={dsgn.title}
                src={dsgn.imageUrl}
                width={200}
                height={200}
                className='w-full h-[50vh] object-cover'
            />
            <div className='flex items-center justify-between mt-2'>
                <span className='w-[80%] text-gray-600 h-fit text-sm font-medium'>
                    {dsgn.title.replaceAll("-", " ").toLocaleUpperCase()}
                </span>
                <span className='w-fit p-2 text-orange-500 bg-orange-200 rounded-3xl text-center text-xs uppercase font-medium'>
                    {dsgn.Category}
                </span>
            </div>
        </div>
    );
}
