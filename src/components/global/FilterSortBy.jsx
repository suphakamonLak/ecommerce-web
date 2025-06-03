import { useEffect } from "react"

export default function FilterSortBy({ statusOptions, onSelect }) {

    useEffect(() => {
        window.HSStaticMethods.autoInit();
    }, [])

    return (
        <div className="flex-col sm:flex-row sm:inline-flex sm:gap-4 mb-4">
            {/* filter */}
            <div className="hs-dropdown [--auto-close:inside]">
                <button
                    id="filter"
                    className="justify-center hs-dropdown-toggle h-full w-full text-black font-semibold text-md bg-neutral-300 focus:right-4 focus:outline-none focus:ring-neutral-500 rounded-lg px-5 py-1 text-center inline-flex items-center"
                    type="button"
                >
                    Filter
                </button>

                {/* dropdown filter */}
                <div 
                    aria-labelledby="filter" 
                    className="hs-dropdown-menu z-10 hidden p-3 bg-white rounded-lg shadow border border-neutral-300"
                >
                    <label className="text-sm font-medium text-neutral-900">Filter</label>
                    <ul 
                        className="sm:flex sm:flex-auto sm:flex-row flex flex-col cursor-pointer items-center justify-center mb-3 p-1 gap-2 rounded-lg text-sm text-neutral-700"
                        aria-labelledby="dropdownFilterButton"
                    >
                        <li className="flex">
                            {
                                statusOptions.map((item, index) => 
                                    <div key={index} className="p-2 rounded hover:bg-neutral-100 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 cursor-pointer text-primary-default bg-neutral-100 border-neutral-300 rounded focus:ring-2"
                                            onChange={() => onSelect(item)}
                                        />
                                        <label className="w-full ms-2 cursor-pointer text-sm font-medium text-neutral-900 rounded">{item}</label>
                                    </div>
                                )
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

