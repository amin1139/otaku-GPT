import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ANILIST_URL } from "../utils/constants"
import { topAnimeBody, normalizeAnime } from "../utils/anilist"
import useFetchApi from "./useFetchApi"
import { addPromo, addTopAnime } from "../utils/animeSlice"

const body = topAnimeBody(1)

const useTopAnimeList = () => {
    const dispatch = useDispatch()
    const topAnime = useSelector((store) => store.anime.topAnime)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if (topAnime) return
        const t = setTimeout(() => setUrl(ANILIST_URL), 0)
        return () => clearTimeout(t)
    }, [])

    const { data, loading, error } = useFetchApi(url, body)

    useEffect(() => {
        if (data) {
            const list = data.data.Page.media.map(normalizeAnime)
            dispatch(addTopAnime(list))
            // promo = first trending anime that has a YouTube trailer
            dispatch(addPromo(list.find((a) => a.trailer?.embed_url) || list[0] || null))
        }
    }, [data, dispatch])

    return { loading, error }
}

export default useTopAnimeList