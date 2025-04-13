"use client";

import ConsultationTable from "@/components/ConsultationTable";
import Loader from "@/components/Loader";
import CustomPagination from "@/components/Pagination";
import PerPage from "@/components/PerPage";
import SearchBox from "@/components/SearchBox";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Cities, Properties } from "@/constants";
import useQuery, { ParamType } from "@/hooks/useQuery";
import { capitalizeFirstLetterOfEachWord } from "@/utils/utilityMethods";
import { Prisma } from "@prisma/client";
import { useState } from "react";

export default function ConsultationPage() {
    const [selectedProperty, setselectedProperty] = useState<string[]>([]);
    const [selectedCity, setselectedCity] = useState<string[]>([]);

    const { data, loading, page, limit, setParams, search, refetch } = useQuery<
        Prisma.FreeDesignConsultationGetPayload<{ include: { Design: true } }>
    >({
        api: "/consultations",
        params: { property: selectedProperty.join(","), city: selectedCity.join(",") },
    });

    return (
        <div className='p-8'>
            <div className='space-y-3 mb-3'>
                <h2 className='font-bold text-2xl text-gray-600 my-4'>
                    Consultation Requests
                </h2>
                <div className='flex items-center justify-between px-3'>
                    <SearchBox
                        search={search}
                        setSearch={(val) =>
                            setParams({ type: ParamType.SEARCH, value: val })
                        }
                    />
                    <PerPage
                        limit={limit}
                        setLimit={(val) =>
                            setParams({ type: ParamType.LIMIT, value: val })
                        }
                    />
                </div>
                <div className='flex flex-wrap items-center justify-start gap-6 px-4'>
                    {Properties.map((property) => (
                        <div key={property.value} className='flex gap-2'>
                            <Checkbox
                                id={property.value}
                                className='cursor-pointer'
                                onCheckedChange={(e) => {
                                    if (e.valueOf()) {
                                        setselectedProperty([
                                            ...selectedProperty,
                                            property.value,
                                        ]);
                                        setParams({
                                            type: ParamType.OTHER_PARAMS,
                                            value: {
                                                property: [
                                                    ...selectedProperty,
                                                    property.value,
                                                ].join(","),
                                            },
                                        });
                                    } else {
                                        setParams({
                                            type: ParamType.OTHER_PARAMS,
                                            value: {
                                                property: selectedProperty
                                                    .filter(
                                                        (val) =>
                                                            val !==
                                                            property.value
                                                    )
                                                    .join(","),
                                            },
                                        });
                                        setselectedProperty((prev) =>
                                            prev.filter(
                                                (val) => val !== property.value
                                            )
                                        );
                                    }
                                }}
                            />
                            <Label
                                htmlFor={property.value}
                                className='cursor-pointer'
                            >
                                {property.label}
                            </Label>
                        </div>
                    ))}
                </div>
                <div className='flex flex-wrap items-center justify-start gap-3 px-4'>
                    {Cities.map((city) => (
                        <div key={city} className='flex gap-2'>
                            <Checkbox
                                id={city}
                                className='cursor-pointer'
                                onCheckedChange={(e) => {
                                    if (e.valueOf()) {
                                        setselectedCity([
                                            ...selectedCity,
                                            city
                                        ]);
                                        setParams({
                                            type: ParamType.OTHER_PARAMS,
                                            value: {
                                                city: [
                                                    ...selectedCity,
                                                    city
                                                ].join(","),
                                            },
                                        });
                                    } else {
                                        setParams({
                                            type: ParamType.OTHER_PARAMS,
                                            value: {
                                                city: selectedCity
                                                    .filter(
                                                        (val) =>
                                                            val !==
                                                            city
                                                    )
                                                    .join(","),
                                            },
                                        });
                                        setselectedCity((prev) =>
                                            prev.filter(
                                                (val) => val !== city
                                            )
                                        );
                                    }
                                }}
                            />
                            <Label
                                htmlFor={city}
                                className='cursor-pointer text-sm'
                            >
                                {capitalizeFirstLetterOfEachWord(city.replace("_", " "))}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            {!loading ? (
                <>
                    <ConsultationTable data={data} refetch={refetch} />
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
