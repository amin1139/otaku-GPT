import { useEffect, useState } from "react"

const useFetchApi = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return
        
        let cancelled = false
        
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            
            try {
                const response = await fetch(url)
                
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                }
                
                const json = await response.json()
                if (!cancelled) setData(json)
            } catch (err) {
                if (!cancelled) setError(err.message)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        
        fetchData()
        
        return () => { cancelled = true }
    }, [url])

    return { data, loading, error }
}

export default useFetchApi