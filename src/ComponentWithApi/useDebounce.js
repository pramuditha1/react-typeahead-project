import { useEffect, useState } from 'react'

function useDebounce(value, delay) {
    const [debounceValue, setdebounceValue] = useState(value)

    useEffect(() => {
            const identifier = setTimeout(() => {
                setdebounceValue(value)
            }, delay)

            return () => {
                clearTimeout(identifier)
            }
        }, [value, delay])

  return debounceValue
}

export default useDebounce