import React from 'react'
import { RxCross1 } from 'react-icons/rx';

function FilterCompo({ handleFilteredOption, filteredOption, filterData }) {

    return (
        <>
            <div className='mt-4 flex gap-3'>
                {
                    filterData.map((filter, idx) => {
                        if (filteredOption == filter.name) return < div key={idx} className='flex items-center gap-2 shadow-custom p-6 py-2 px-3 rounded-3xl cursor-pointer border border-zinc-500 bg-zinc-200' onClick={() => handleFilteredOption(filter.name)}>
                            <p className='font-semibold text-sm text-zinc-600'>{filter.name}</p>
                            {filter?.icon}
                            <RxCross1 />
                        </div>

                        return (
                            < div onClick={() => handleFilteredOption(filter.name)} key={idx} className='flex items-center gap-2 shadow-custom p-6 py-2 px-3 rounded-3xl cursor-pointer'>
                                <p className='font-semibold text-sm text-zinc-600'>{filter.name}</p>
                                {filter?.icon}
                            </div>
                        )
                    })
                }
            </div >
        </>
    )
}

export default FilterCompo