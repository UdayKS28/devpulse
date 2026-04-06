import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Grid, Typography, TextField, MenuItem,
  Select, FormControl, InputLabel, Skeleton, Alert,
  Button, Chip, Stack
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useFetch } from '../hooks/useFetch'
import { getUser, getUserRepos } from '../api/github'
import ProfileCard from '../components/profile/Profilecard'
import RepoCard from '../components/profile/ReportCard'
import LanguageChart from '../components/profile/LanguageChart'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { useSavedProfiles } from '../hooks/useSavedProfiles'
import { Tooltip, IconButton } from '@mui/material'

export default function Profile() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('updated')
  const [langFilter, setLangFilter] = useState('All')
  const { toggleSave, isSaved } = useSavedProfiles()
  const saved = isSaved(username)

  const {
    data: user, loading: userLoading, error: userError
  } = useFetch(() => getUser(username), [username])

  const {
    data: repos, loading: reposLoading, error: reposError
  } = useFetch(() => getUserRepos(username), [username])

  // Derive unique languages from repos
  const languages = useMemo(() => {
    if (!repos) return []
    const langs = [...new Set(repos.map(r => r.language).filter(Boolean))]
    return ['All', ...langs]
  }, [repos])

  // Filter + sort repos
  const filteredRepos = useMemo(() => {
    if (!repos) return []
    return repos
      .filter(r => {
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
        const matchLang = langFilter === 'All' || r.language === langFilter
        return matchSearch && matchLang
      })
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count
        if (sortBy === 'forks') return b.forks_count - a.forks_count
        return new Date(b.updated_at) - new Date(a.updated_at)
      })
  }, [repos, search, sortBy, langFilter])

  if (userError) {
    return (
      <Box textAlign="center" mt={8}>
        <Alert severity="error" sx={{ maxWidth: 400, mx: 'auto', mb: 2 }}>
          {userError}
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
          Back to search
        </Button>
      </Box>
    )
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
  <Button
    startIcon={<ArrowBackIcon />}
    onClick={() => navigate('/')}
    sx={{ color: 'text.secondary' }}
  >
    Back
  </Button>

  {user && (
    <Tooltip title={saved ? 'Remove from saved' : 'Save profile'}>
      <IconButton
        onClick={() => toggleSave(username)}
        sx={{
          color: saved ? 'primary.main' : 'text.secondary',
          border: '1px solid',
          borderColor: saved ? 'primary.main' : 'divider',
          borderRadius: 2,
          gap: 0.5,
          px: 1.5,
        }}
      >
        {saved ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
        <Typography fontSize={13}>
          {saved ? 'Saved' : 'Save'}
        </Typography>
      </IconButton>
    </Tooltip>
  )}
</Box>
  )
}

// Skeleton for profile card while loading
function ProfileSkeleton() {
  return (
    <Box sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3 }}>
      <Box display="flex" gap={2} mb={2}>
        <Skeleton variant="circular" width={80} height={80} />
        <Box flex={1}>
          <Skeleton width="60%" height={24} sx={{ mb: 1 }} />
          <Skeleton width="40%" height={18} />
        </Box>
      </Box>
      <Skeleton height={1} sx={{ my: 2 }} />
      <Box display="flex" gap={3}>
        {[1,2,3].map(i => <Skeleton key={i} width={60} height={40} />)}
      </Box>
      <Skeleton height={1} sx={{ my: 2 }} />
      {[1,2,3].map(i => <Skeleton key={i} width="80%" height={18} sx={{ mb: 1 }} />)}
    </Box>
  )
}