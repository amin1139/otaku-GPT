import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ANILIST_URL } from "../utils/constants"
import { seasonAnimeBody, normalizeAnime } from "../utils/anilist"
import useFetchApi from "./useFetchApi"
import { addSeasonAnime } from "../utils/animeSlice"

const body = seasonAnimeBody(1)

const useSeasonAnimeList = () => {
    const dispatch = useDispatch()
    const seasonAnime = useSelector((store) => store.anime.seasonAnime)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if (seasonAnime) return // already data hai, fetch mat karo
        const t = setTimeout(() => setUrl(ANILIST_URL), 500)
        return () => clearTimeout(t)
    }, [])

    const { data, loading, error } = useFetchApi(url, body)

    useEffect(() => {
        if (data) dispatch(addSeasonAnime(data.data.Page.media.map(normalizeAnime)))
    }, [data, dispatch])

    return { loading, error }
}

export default useSeasonAnimeList