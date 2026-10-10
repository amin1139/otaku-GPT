import { useEffect, useState } from "react"

// GET by default. If `body` is passed, it does a JSON POST (needed for GraphQL).
const useFetchApi = (url, body = null) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const bodyKey = body ? JSON.stringify(body) : null

    useEffect(() => {
        if (!url) return

        let cancelled = false
        let retryTimeout = null

        const fetchData = async (retryCount = 0) => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(
                    url,
                    bodyKey
                        ? {
                              method: "POST",
                              headers: { "Content-Type": "application/json", Accept: "application/json" },
                              body: bodyKey,
                          }
                        : undefined
                )

                if (response.status === 429) {
                    // Rate limited — retry after delay
                    const delay = Math.pow(2, retryCount) * 1000 // 1s, 2s, 4s...
                    if (retryCount < 4 && !cancelled) {
                        retryTimeout = setTimeout(() => fetchData(retryCount + 1), delay)
                    }
                    return
                }

                const json = await response.json()
                if (!response.ok || json.errors) {
                    throw new Error(json.errors?.[0]?.message || `HTTP error: ${response.status}`)
                }
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
    }, [url, bodyKey])

    return { data, loading, error }
}

export default useFetchApi