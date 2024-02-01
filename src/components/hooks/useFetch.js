import { useState, useEffect } from "react"

const useFetch = ({ url, method, body }) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const callFetch = async () => {
      try {
        setLoading(true)

        const response = await fetch(url, {
          method: method || "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : null,
        })

        if (!response.ok) {
          throw new Error("Request failed")
        }

        const result = await response.json()
        setData(result)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    callFetch()
  }, [url, method, body])

  return { data, loading, error }
}

export default useFetch
