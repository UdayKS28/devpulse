import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, TextField, Button,
  Stack, Avatar, Tooltip, IconButton
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CloseIcon from '@mui/icons-material/Close'
import { useSavedProfiles } from '../hooks/useSavedProfiles'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { saved, toggleSave } = useSavedProfiles()

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/user/${query.trim()}`)
  }, [query, navigate])

  return (
    <Box sx={{ maxWidth: 560, margin: '60px auto 0', textAlign: 'center' }}>
      <Box
        component="img"
        src="/svg.svg"
        alt="DevPulse Logo"
        sx={{ width: 160, height: 160, mb: 1 }}
      />

      <Typography variant="h3" fontWeight={700} mb={1}>
        <Box component="span" color="primary.main">Dev</Box>Pulse
      </Typography>

      <Typography color="text.secondary" mb={4} fontSize={16}>
        Explore GitHub profiles, repos, and activity
      </Typography>

      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search a GitHub username..."
          size="medium"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          sx={{ px: 3, whiteSpace: 'nowrap' }}
        >
          Search
        </Button>
      </Box>

      {/* Saved profiles section */}
      {saved.length > 0 && (
        <Box mt={5} textAlign="left">
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <BookmarkIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            <Typography fontSize={13} fontWeight={600} color="text.secondary">
              Saved profiles
            </Typography>
          </Box>

          <Stack spacing={1}>
            {saved.map(username => (
              <Box
                key={username}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  px: 2,
                  py: 1.5,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: 'primary.main' },
                }}
                onClick={() => navigate(`/user/${username}`)}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Avatar
                    src={`https://github.com/${username}.png?size=40`}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography fontSize={14} color="text.primary">
                    {username}
                  </Typography>
                </Box>
                <Tooltip title="Remove">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSave(username)
                    }}
                    sx={{ color: 'text.secondary' }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}