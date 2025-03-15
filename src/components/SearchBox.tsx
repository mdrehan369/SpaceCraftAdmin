import { useRef, useState } from "react";
import { Input } from "./ui/input";

export default function SearchBox({
    search,
    setSearch,
}: {
    search: string;
    setSearch: (val: string) => void;
}) {
    const [searchUtil, setSearchUtil] = useState(search);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const valueRef = useRef("");

    const handleInputChangeWithDebouncing = (value: string) => {
        setSearchUtil(value);
        valueRef.current = value
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setSearch(valueRef.current);
            timerRef.current = null;
        }, 1000);
    };

    return (
        <div className='w-[40%]'>
            <Input
                placeholder='Search here...'
                className=''
                value={searchUtil}
                onChange={(e) =>
                    handleInputChangeWithDebouncing(e.target.value)
                }
            />
        </div>
    );
}
