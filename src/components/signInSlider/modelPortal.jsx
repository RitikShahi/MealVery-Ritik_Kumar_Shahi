import React from 'react'

function ModelPortal({ children }) {
    return (
        <div className='fixed bg-[#0000004a] right-0 top-0 w-full h-screen z-50'>
            {children}
        </div>
    )
}

export default ModelPortal