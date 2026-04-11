import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SEASON_ANIME_URL } from "../utils/constants"
import useFetchApi from "./useFetchApi"
import { addSeasonAnime } from "../utils/animeSlice"

const useSeasonAnimeList = () => {
    const dispatch = useDispatch()
    const seasonAnime = useSelector((store) => store.anime.seasonAnime)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if (seasonAnime) return // already data hai, fetch mat karo
        const t = setTimeout(() => setUrl(SEASON_ANIME_URL), 500) // 1000ms delay
        return () => clearTimeout(t)
    }, [])

    const { data, loading, error } = useFetchApi(url)

    useEffect(() => {
        if (data) dispatch(addSeasonAnime(data?.data))
    }, [data, dispatch])

    return { loading, error }
}

export default useSeasonAnimeList