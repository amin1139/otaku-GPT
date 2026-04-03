import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TOP_ANIME_URL } from "../utils/constants"
import useFetchApi from "./useFetchApi"
import { addPromo, addTopAnime } from "../utils/animeSlice"

const useTopAnimeList = () => {
    const dispatch = useDispatch()
    const topAnime = useSelector((store) => store.anime.topAnime)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if (topAnime) return // already data hai, fetch mat karo
        const t = setTimeout(() => setUrl(TOP_ANIME_URL), 0) // 500ms delay
        return () => clearTimeout(t)
    }, [])

    const { data, loading, error } = useFetchApi(url)

    useEffect(() => {
        if (data){
            dispatch(addTopAnime(data?.data))
            dispatch(addPromo(data?.data[1]))
        } 
    }, [data, dispatch])

    return { loading, error }
}

export default useTopAnimeList