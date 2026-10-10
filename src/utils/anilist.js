import { ANILIST_URL } from "./constants"

const MEDIA_FIELDS = `
  id
  title { romaji english }
  coverImage { large }
  averageScore
  episodes
  genres
  status
  description(asHtml: false)
  trailer { id site }
`

const LIST_QUERY = `
query ($page: Int, $perPage: Int, $sort: [MediaSort], $season: MediaSeason, $seasonYear: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo { hasNextPage }
    media(type: ANIME, isAdult: false, sort: $sort, season: $season, seasonYear: $seasonYear) {
      ${MEDIA_FIELDS}
    }
  }
}`

const getCurrentSeason = () => {
  const now = new Date()
  const season = ["WINTER", "SPRING", "SUMMER", "FALL"][Math.floor(now.getMonth() / 3)]
  return { season, seasonYear: now.getFullYear() }
}

// Top anime = trending
export const topAnimeBody = (page = 1) => ({
  query: LIST_QUERY,
  variables: { page, perPage: 25, sort: ["TRENDING_DESC"] },
})

// Season anime = current season + year, most popular first
export const seasonAnimeBody = (page = 1) => ({
  query: LIST_QUERY,
  variables: { page, perPage: 25, sort: ["POPULARITY_DESC"], ...getCurrentSeason() },
})

export const anilistRequest = async (body) => {
  const res = await fetch(ANILIST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok || json.errors) {
    throw new Error(json.errors?.[0]?.message || `HTTP error: ${res.status}`)
  }
  return json.data
}

const STATUS_MAP = {
  FINISHED: "Finished Airing",
  RELEASING: "Currently Airing",
  NOT_YET_RELEASED: "Not yet aired",
  CANCELLED: "Cancelled",
  HIATUS: "On Hiatus",
}

// AniList -> old Jikan shape, so the components don't need to change
export const normalizeAnime = (m) => ({
  mal_id: m.id,
  title: m.title?.romaji,
  title_english: m.title?.english || m.title?.romaji,
  images: { jpg: { large_image_url: m.coverImage?.large } },
  score: m.averageScore ? m.averageScore / 10 : null,
  episodes: m.episodes,
  genres: (m.genres || []).map((name) => ({ name })),
  status: STATUS_MAP[m.status] || m.status,
  synopsis: m.description ? m.description.replace(/<[^>]*>/g, "") : "",
  trailer: {
    embed_url:
      m.trailer?.site === "youtube" && m.trailer?.id
        ? `https://www.youtube.com/embed/${m.trailer.id}`
        : null,
  },
})

// FindGpt: AI ne jo anime name diya, uska best match (1 result)
const SEARCH_QUERY = `
query ($search: String) {
  Page(page: 1, perPage: 1) {
    media(type: ANIME, isAdult: false, search: $search, sort: SEARCH_MATCH) {
      ${MEDIA_FIELDS}
    }
  }
}`

export const searchAnimeBody = (search) => ({
  query: SEARCH_QUERY,
  variables: { search },
})