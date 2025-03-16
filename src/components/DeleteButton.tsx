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
import Button from "./Button";

export default function DeleteButton({ title, description, handler, id }: { title: string; description: string, handler: (id: number) => void; id: number }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='absolute top-0 right-0 w-full h-full hidden group-hover:flex bg-black/20 transition-all group-hover:backdrop-blur-[1px] duration-300 items-center justify-center'>
                    <button className='bg-red-300 text-red-800 text-sm cursor-pointer flex items-center justify-center gap-2 p-2 rounded-sm hover:border-red-800 border-transparent border-[1px] hover:bg-red-200 transition-all'>
                        <Trash2 />
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='sm:justify-start'>
                    <DialogClose asChild>
                        <Button type='button' variant='secondary' onClick={() => handler(id)}>
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
