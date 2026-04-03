// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { PROMO_URL } from "../utils/constants"
// import useFetchApi from "./useFetchApi"
// import { addPromo } from "../utils/animeSlice"

// const useAnimePromo = () => {
//     const dispatch = useDispatch()
//     const promo = useSelector((store) => store.anime.promo)
//     const [url, setUrl] = useState(null)

//     useEffect(() => {
//         if (promo) return // already data hai, fetch mat karo
//         const t = setTimeout(() => setUrl(PROMO_URL), 0) // no delay, first request
//         return () => clearTimeout(t)
//     }, [])

//     const { data, loading, error } = useFetchApi(url)

//     useEffect(() => {
//         if (data) dispatch(addPromo(data?.data[1]))
//     }, [data, dispatch])

//     return { loading, error }
// }

// export default useAnimePromo