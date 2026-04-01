import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { PROMO_URL } from "../utils/constants"
import useFetchApi from "./useFetchApi"
import { addPromo } from "../utils/animeSlice"

const useAnimePromo = () => {
    const dispatch = useDispatch()
    const { data, loading, error } = useFetchApi(PROMO_URL)

    useEffect(() => {
        if (data) {
            dispatch(addPromo(data?.data[0]))
        }
    }, [data])

    return { data, loading, error }
}

export default useAnimePromo