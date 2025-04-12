"use client";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
    _count: {
        label: "Visits",
        color: "#2563eb",
    },
} satisfies ChartConfig;

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export default function Dashboard({
    visitsPerCity,
    visitsPerDesign,
    visitsPerMonth,
    visitsThisMonth,
}: {
    visitsPerCity: Array<{ _count: number; city: string }>;
    visitsPerDesign: Array<{ _count: number; design: string }>;
    visitsPerMonth: Array<{ count: number; month: string }>;
    visitsThisMonth: Array<{ count: number; date: string }>;
}) {
    return (
        <div className='w-full grid grid-cols-2 gap-3 p-8'>
            <div className='bg-gray-100 p-4 rounded-md transition-colors'>
                <h2 className='text-sm text-gray-800 font-semibold uppercase'>
                    Visits Per Month
                </h2>
                <ChartContainer config={chartConfig} className="min-h-[200px]">
                    <AreaChart
                        accessibilityLayer
                        data={visitsPerMonth}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='month'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={25}
                            angle={-55}
                            tickFormatter={(value) =>
                                monthNames[new Date(value).getMonth()]
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator='dot' />}
                        />
                        <Area
                            dataKey='count'
                            type='natural'
                            fill='#f96c00'
                            fillOpacity={0.4}
                            stroke='#f96c00'
                            stackId='a'
                        />
                    </AreaChart>
                </ChartContainer>
            </div>

            <div className='bg-gray-100 p-4  rounded-md transition-colors'>
                <h2 className='text-sm text-gray-800 font-semibold uppercase'>
                    Visits Per Design
                </h2>
                <ChartContainer
                    config={chartConfig}
                    className='h-full w-full p-4 min-h-[200px]'
                >
                    <BarChart
                        accessibilityLayer
                        data={visitsPerDesign}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                        <CartesianGrid vertical={true} />
                        <XAxis
                            className='p-4'
                            dataKey='design'
                            tickLine={false}
                            tickMargin={5}
                            angle={-55}
                            textAnchor='end'
                            interval={0}
                            axisLine={false}
                            tickFormatter={(value) =>
                                value.replaceAll("_", " ")
                            }
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey='_count' fill='#f96c00' radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>

            <div className='bg-gray-100 p-4 rounded-md transition-colors'>
                <h2 className='text-sm text-gray-800 font-semibold uppercase'>
                    Visits This Month
                </h2>
                <ChartContainer config={chartConfig} className="min-h-[200px]">
                    <AreaChart
                        accessibilityLayer
                        data={visitsThisMonth}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='date'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={25}
                            tickFormatter={(value) =>
                                new Date(value).getDate().toString()
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator='dot' />}
                        />
                        <Area
                            dataKey='count'
                            type='natural'
                            fill='#f96c00'
                            fillOpacity={0.4}
                            stroke='#f96c00'
                            stackId='a'
                        />
                    </AreaChart>
                </ChartContainer>
            </div>

            <div className='bg-gray-100 p-4 rounded-md transition-colors'>
                <h2 className='text-sm text-gray-800 font-semibold uppercase'>
                    Visits Per City
                </h2>
                <ChartContainer
                    config={chartConfig}
                    className='h-full w-full p-4 min-h-[200px]'
                    title='Visits Per City'
                >
                    <BarChart
                        accessibilityLayer
                        data={visitsPerCity}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                        <CartesianGrid vertical={true} />
                        <XAxis
                            className='p-4'
                            dataKey='city'
                            tickLine={false}
                            tickMargin={5}
                            angle={-55}
                            textAnchor='end'
                            interval={0}
                            axisLine={false}
                            tickFormatter={(value) =>
                                value.replaceAll("_", " ")
                            }
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey='_count' fill='#f96c00' radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
}
