import DesignForm from "@/components/forms/AddDesignForm";

export default function AddPage() {

    return (
        <div className='p-0 w-[100%] flex flex-col items-center justify-center min-h-[100%] overflow-y-hidden'>
            <h2 className='font-bold text-2xl text-gray-700 my-4 w-[60%] text-start'>Add New Design</h2>
            <DesignForm />
        </div>
    );
}
