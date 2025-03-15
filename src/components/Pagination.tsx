import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function CustomPagination({ page, setPage, isNextAvailable }: { page: number, setPage: (val: number) => void, isNextAvailable: boolean }) {
    return (
        <Pagination className='mt-2'>
        <PaginationContent>
            {page > 1 && (
                <PaginationItem className='cursor-pointer'>
                    <PaginationPrevious
                        onClick={() =>
                            setPage(page-1)
                        }
                    />
                </PaginationItem>
            )}
            {page - 1 > 0 && (
                <PaginationItem
                    key={page - 1}
                    className='cursor-pointer'
                >
                    <PaginationLink
                        onClick={() =>
                            setPage(page-1)
                        }
                    >
                        {page - 1}
                    </PaginationLink>
                </PaginationItem>
            )}
            {page > 0 && (
                <PaginationItem key={page} className='cursor-pointer bg-gray-100 rounded'>
                    <PaginationLink>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            )}
            {isNextAvailable && (
                <PaginationItem
                    key={page + 1}
                    className='cursor-pointer'
                >
                    <PaginationLink
                        onClick={() =>
                            setPage(page + 1)
                        }
                    >
                        {page + 1}
                    </PaginationLink>
                </PaginationItem>
            )}
            {isNextAvailable && (
                <PaginationItem className='cursor-pointer'>
                    <PaginationNext
                        onClick={() =>
                            setPage(page+1)
                        }
                    />
                </PaginationItem>
            )}
        </PaginationContent>
    </Pagination>
    )
}