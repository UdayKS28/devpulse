const BASE_URL = 'https://api.github.com'

const headers = {
  'Accept': 'application/vnd.github.v3+json',
}

export async function getUser(username) {
  const res = await fetch(`${BASE_URL}/users/${username}`, { headers })
  if (!res.ok) throw new Error(res.status === 404 ? 'User not found' : 'GitHub API error')
  return res.json()
}

export async function getUserRepos(username) {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=30`,
    { headers }
  )
  if (!res.ok) throw new Error('Could not fetch repositories')
  return res.json()
}

export async function getTrendingRepos() {
  const date = new Date()
  date.setDate(date.getDate() - 30)
  const since = date.toISOString().split('T')[0]
  const res = await fetch(
    `${BASE_URL}/search/repositories?q=stars:>500+created:>${since}&sort=stars&order=desc&per_page=20`,
    { headers }
  )
  if (!res.ok) throw new Error('Could not fetch trending repositories')
  return res.json()
}