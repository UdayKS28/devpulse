import { useState, useMemo } from 'react'
import {
  Box, Typography, Chip, Stack, Grid,
  Skeleton, Alert, Divider
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useFetch } from '../hooks/useFetch'
import { getTrendingRepos } from '../api/github'
import TrendingRepoCard from '../components/trending/TrendingRepoCard'

const LANG_FILTERS = ['All', 'JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C++']

export default function Trending() {
  const [langFilter, setLangFilter] = useState('All')

  const { data, loading, error, refetch } = useFetch(
    () => getTrendingRepos(),
    []
  )

  const repos = data?.items ?? []

  const filtered = useMemo(() => {
    if (langFilter === 'All') return repos
    return repos.filter(r => r.language === langFilter)
  }, [repos, langFilter])

  return (
    <Box>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <TrendingUpIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h5" fontWeight={700}>
          Trending repositories
        </Typography>
      </Box>
      <Typography color="text.secondary" fontSize={14} mb={3}>
        Most starred repositories created in the last 30 days
      </Typography>

      {/* Language filter chips */}
      <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
        {LANG_FILTERS.map(lang => (
          <Chip
            key={lang}
            label={lang}
            onClick={() => setLangFilter(lang)}
            variant={langFilter === lang ? 'filled' : 'outlined'}
            color={langFilter === lang ? 'primary' : 'default'}
            size="small"
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Error state */}
      {error && (
        <Alert
          severity="error"
          action={
            <Chip label="Retry" size="small" onClick={refetch} />
          }
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* Loading skeletons */}
      {loading && (
        <Stack spacing={2}>
          {Array(6).fill(0).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={110}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>
      )}

      {/* Repo list */}
      {!loading && !error && (
        <>
          <Typography color="text.secondary" fontSize={13} mb={2}>
            Showing {filtered.length} repositories
            {langFilter !== 'All' ? ` in ${langFilter}` : ''}
          </Typography>

          <Stack spacing={2}>
            {filtered.map((repo, index) => (
              <TrendingRepoCard
                key={repo.id}
                repo={repo}
                rank={index + 1}
              />
            ))}

            {filtered.length === 0 && !loading && (
              <Typography
                color="text.secondary"
                textAlign="center"
                mt={6}
              >
                No trending repos found for {langFilter} this month
              </Typography>
            )}
          </Stack>
        </>
      )}
    </Box>
  )
}