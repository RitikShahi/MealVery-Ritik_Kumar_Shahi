import React, { useEffect, useState } from 'react'

function useFetch(api, coord) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    async function fetchData() {
        try {
            setLoading(true)
            const response = await fetch(`${api}`)
            const data = await response.json()
            if (data) {
                setData(data)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, [api])

    return { data, loading, error }
}

export default useFetch