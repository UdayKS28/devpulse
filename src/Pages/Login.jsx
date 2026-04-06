import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, TextField, Button, Alert, Paper,
  CircularProgress, Link, Stack
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleValidateAndLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!token.trim()) {
      setError('Please enter a GitHub token')
      return
    }

    setLoading(true)
    try {
      // Validate token by fetching user info
      const res = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      })

      if (!res.ok) {
        throw new Error('Invalid token. Please check and try again.')
      }

      const userData = await res.json()
      console.log('Authenticated as:', userData.login)

      // Valid token - save it
      login(token)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Failed to validate token')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 420,
          width: '100%',
          mx: 2,
        }}
      >
        {/* Header */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <LockIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography variant="h5" fontWeight={700} mb={0.5}>
            DevPulse Login
          </Typography>
          <Typography color="text.secondary" fontSize={14}>
            Authenticate with GitHub token
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleValidateAndLogin}>
          <TextField
            fullWidth
            label="GitHub Personal Access Token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            disabled={loading}
            margin="normal"
            variant="outlined"
            helperText="Create one at github.com/settings/tokens"
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            sx={{ mb: 2, py: 1.2 }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Login'
            )}
          </Button>
        </Box>

        {/* Info Section */}
        <Box
          sx={{
            bgcolor: 'background.default',
            p: 2,
            borderRadius: 1,
            fontSize: 12,
          }}
        >
          <Typography variant="caption" display="block" fontWeight={600} mb={1}>
            Why a token?
          </Typography>
          <Stack spacing={0.5}>
            <Typography variant="caption" component="div">
              • Increases API rate limit from 60 to 5,000 requests/hour
            </Typography>
            <Typography variant="caption" component="div">
              • Access to private repos and additional data
            </Typography>
            <Typography variant="caption" component="div">
              • Token stored locally - never sent to our servers
            </Typography>
          </Stack>
        </Box>

        {/* Footer */}
        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          sx={{ mt: 3, color: 'text.secondary' }}
        >
          Don't have a token?{' '}
          <Link
            href="https://github.com/settings/tokens/new?scopes=public_repo,user"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ cursor: 'pointer' }}
          >
            Create one here
          </Link>
        </Typography>
      </Paper>
    </Box>
  )
}
