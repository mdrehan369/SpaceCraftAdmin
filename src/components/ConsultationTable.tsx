import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    assignPropertyTypeLabel,
    capitalizeFirstLetterOfEachWord,
    convertToReadableDate,
} from "@/utils/utilityMethods";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import DesignCard from "@/components/DesignCard";
import { Prisma } from "@prisma/client";
import { Check } from "lucide-react";
import { markDone } from "@/actions/consultations.action";

const StatusBadge = ({ status }: { status: boolean }) => {
    return (
        <div
            className={`rounded-sm p-1 text-xs text-center font-bold ${
                status
                    ? "bg-green-300 text-green-800"
                    : "bg-yellow-300 text-yellow-800"
            }`}
        >
            {status ? "DONE" : "PENDING"}
        </div>
    );
};

export default function ConsultationTable({
    data,
    refetch
}: {
    data: Prisma.FreeDesignConsultationGetPayload<{
        include: { Design: true };
    }>[];
    refetch?: () => void
}) {
    return (
        <Table className='w-full overflow-x-hidden mb-4'>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-fit'>Name</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead className='text-left'>Property</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-left'>Design</TableHead>
                    <TableHead className='text-left'>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(
                    ({
                        id,
                        name,
                        city,
                        property,
                        phoneNumber,
                        Design,
                        isConsultationDone,
                        createdAt
                    }) => (
                        <TableRow
                            key={id}
                            className='w-full cursor-pointer group'
                            suppressHydrationWarning
                        >
                            <TableCell className='font-medium'>
                                {name}
                            </TableCell>
                            <TableCell>
                                {capitalizeFirstLetterOfEachWord(
                                    city.replace("_", " ")
                                )}
                            </TableCell>
                            <TableCell>{phoneNumber}</TableCell>
                            <TableCell className='text-left'>
                                {assignPropertyTypeLabel(property)}
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={isConsultationDone} />
                            </TableCell>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <TableCell className='text-left'>
                                        {capitalizeFirstLetterOfEachWord(
                                            Design.title
                                        ).slice(0, 30)}
                                        ...
                                    </TableCell>
                                </HoverCardTrigger>
                                <HoverCardContent
                                    side='left'
                                    className='w-full'
                                >
                                    <DesignCard dsgn={Design} />
                                </HoverCardContent>
                            </HoverCard>
                            <TableCell>{convertToReadableDate(createdAt.toString())}</TableCell>
                            <TableCell>
                                {!isConsultationDone && (
                                    <button className='bg-green-300 text-sm font-medium rounded-sm border-transparent border-2 p-1 cursor-pointer hover:bg-green-500 transition-colors group-hover:visible invisible'
                                    onClick={() => {
                                        markDone(id).then(() => refetch?.())
                                    }}
                                    >
                                        <Check className='inline text-sm mr-2 size-4' />
                                        Mark Done
                                    </button>
                                )}
                            </TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    );
}
