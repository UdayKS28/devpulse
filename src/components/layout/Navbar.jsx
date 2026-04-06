import { AppBar, Toolbar, Typography, Button, Box, Tooltip, LinearProgress, Menu, MenuItem, Avatar, IconButton } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { useState } from 'react'
import { useRateLimit } from '../../hooks/useRateLimit'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const rateLimit = useRateLimit()
  const [anchorEl, setAnchorEl] = useState(null)

  const links = [
    { to: '/', label: 'Search' },
    { to: '/trending', label: 'Trending' },
  ]

  const used = rateLimit ? rateLimit.limit - rateLimit.remaining : 0
  const pct = rateLimit ? (rateLimit.remaining / rateLimit.limit) * 100 : 100
  const color = pct > 50 ? 'success' : pct > 20 ? 'warning' : 'error'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{
      backgroundColor: 'background.paper',
      borderBottom: '1px solid',
      borderColor: 'divider',
    }}>
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          fontWeight={700}
          sx={{ textDecoration: 'none', color: 'text.primary', flexGrow: 1 }}
        >
          <Box component="span" color="primary.main">Dev</Box>Pulse
        </Typography>

        {/* Rate limit indicator */}
        {rateLimit && (
          <Tooltip title={`GitHub API: ${rateLimit.remaining}/${rateLimit.limit} requests remaining`}>
            <Box sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-end',
              mr: 2,
              cursor: 'default',
            }}>
              <Typography fontSize={10} color="text.secondary" mb={0.3}>
                API {rateLimit.remaining}/{rateLimit.limit}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={pct}
                color={color}
                sx={{ width: 70, height: 3, borderRadius: 2 }}
              />
            </Box>
          </Tooltip>
        )}

        <Box display="flex" gap={1} alignItems="center">
          {links.map(link => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              variant={pathname === link.to ? 'outlined' : 'text'}
              size="small"
              color="primary"
            >
              {link.label}
            </Button>
          ))}
          
          {/* Logout button */}
          <Tooltip title="Logout">
            <IconButton
              size="small"
              onClick={handleLogout}
              sx={{ ml: 1 }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}