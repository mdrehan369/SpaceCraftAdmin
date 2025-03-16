import { useEffect, useState } from "react";
import axios from "axios";

export interface DataFetchingServerActionProps<T> {
    page: number;
    limit: number;
    sort: 1 | -1;
    otherParams: T;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ServerAction<otherParams> = ((
    params: DataFetchingServerActionProps<otherParams>
) => Promise<{ success: boolean; data: any }>)

export enum ParamType {
    PAGE,
    LIMIT,
    SORT,
    SEARCH,
    OTHER_PARAMS,
}

export default function useQuery<DataType>({
    api,
    params,
}: {
    api: string;
    params: Record<string, any>;
}) {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [sort, setSort] = useState<1 | -1>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [data, setData] = useState<Array<DataType>>([]);
    const [otherParams, setOtherParams] = useState(params);

    const setParams = ({
        type,
        value,
    }: {
        type: ParamType;
        value: string | Record<string, string>;
    }) => {
        if (type === ParamType.SEARCH) {
            setSearch(value as string);
            return;
        }

        if (type === ParamType.OTHER_PARAMS) {
            setOtherParams(value as Record<string, string>);
        }
        const numValue = Number(value);

        switch (type) {
            case ParamType.PAGE:
                if (numValue >= 1) setPage(numValue);
                return;
            case ParamType.LIMIT:
                if (numValue >= 1) setLimit(numValue);
                return;
            case ParamType.SORT:
                if (numValue === 1 || numValue === -1) setSort(numValue);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        const { data, status } = await axios.get(
            `http://localhost:3000/api/v1/${api}`,
            { params: { page, limit, sort, search, ...otherParams } }
        );
        if (status && data.success) setData(data.data);
        setLoading(false);
    };

    const refetch = () => fetchData();

    useEffect(() => {
        setPage(1);
    }, [limit]);

    useEffect(() => {
        fetchData();
    }, [page, limit, sort, search, otherParams]);

    return { page, limit, sort, data, loading, search, setParams, refetch };
}
