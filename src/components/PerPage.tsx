export default function PerPage({ limit, setLimit }: { limit: number, setLimit: (val: string) => void }) {
    return (
        <div className='text-sm space-x-2'>
                        <span className='text-xs font-semibold text-gray-600'>
                            PER PAGE
                        </span>
                        <select
                            className='bg-gray-100 p-2 cursor-pointer'
                            value={limit}
                            onChange={(e) =>
                                setLimit(e.currentTarget.value)
                            }
                        >
                            {[10, 15, 20, 25].map((val) => (
                                <option
                                    value={val}
                                    key={val}
                                    className='cursor-pointer'
                                >
                                    {val}
                                </option>
                            ))}
                        </select>
                    </div>
    )
}