import { useEffect, useState } from "react"

const useFetchApi = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return

        let cancelled = false
        let retryTimeout = null

        const fetchData = async (retryCount = 0) => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(url)

                if (response.status === 429) {
                    // Rate limited — retry after delay
                    const delay = Math.pow(2, retryCount) * 1000 // 1s, 2s, 4s...
                    if (retryCount < 4 && !cancelled) {
                        retryTimeout = setTimeout(() => fetchData(retryCount + 1), delay)
                    }
                    return
                }

                if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

                const json = await response.json()
                if (!cancelled) setData(json)

            } catch (err) {
                if (!cancelled) setError(err.message)
            } finally {
                if (!cancelled && !retryTimeout) setLoading(false)
            }
        }

        fetchData()

        return () => {
            cancelled = true
            clearTimeout(retryTimeout)
        }
    }, [url])

    return { data, loading, error }
}

export default useFetchApi